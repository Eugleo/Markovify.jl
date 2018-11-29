module MarkovChains

export build, walk, walk2, combine, state_with_beginning

"""
    Token{T} = Union{Symbol, T}

Tokens can be of any type. They can also include symbols `:begin` and `:end`
which are used to denote the beginning and end of a suptoken.
"""
Token{T} = Union{Symbol, T}

"""
    State{T} = Vector{Token{T}}

A state is a succession of tokens.
"""
State{T} = Vector{Token{T}}

"""
    TokenOccurences{Token} = Dict{Union{Token, Symbol}, Int}

A dictionary pairing tokens (or special symbols `:begin` and `:end`) with
the number of their respective occurences.
"""
TokenOccurences{T} = Dict{Token{T}, Int}

"""
The datastructure of the Markov chain. Encodes all the different states
and the probabilities of going from one to another as a dictionary. The keys
are the states, the values are the respective
[`TokenOccurences`](@ref) dictionaries. Those are dictionaries which say
how many times was a token found *immediately* after the state.

# Fields
- `order` is the number of tokens the [`State`](@ref)
- `nodes` is a dictionary pairing [`State`](@ref) and its respective
[`TokenOccurences`](@ref) dictionary.
"""
struct Model{T}
    order::Int
    nodes::Dict{State{T}, TokenOccurences{T}}
end

"""
    function combine(chain::Model, others::Model...)

Return a Model which is a combination of all of the models provided. All of the
arguments should have the same `order`. The nodes of all the Models are merged
using the function `merge`.
"""
function combine(chain::Model, others::Model...)
    nodes = merge(chain.nodes for chain in others)
    return Model(chain.order, nodes)
end


"""
    begseq(n)

Return the symbol `:begin` repeated `n` times. This array is then used
as a starting sequence for all suptokens.
"""
begseq(n) = fill(:begin, n)


"""
    stdweight(state::State{T}, token::Token{T}) where T

A constant `1`. Used as a placeholder function in [`build`](@ref) to represent
unbiased weight function.
"""
function stdweight(state::State{T}, token::Token{T}) where T
    return 1
end

"""
    build(suptokens::Vector{Vector{Token{T}}}; order=2, weight=stdweight)

Trains a Markov chain on an array of arrays of tokens (suptokens).
Optionally an `order` of the chain can be supplied, that is
the number of tokens in one state. A weight function of general
type `func(s::State{T}, t::Token{T})::Int` can be supplied to be used
to bias the weights based on the state or token.
"""
function build(suptokens::Vector{Vector{Token{Any}}}; order=2, weight=stdweight)
    nodes = Dict()
    begin_sequence = begseq(order)
    for incomplete_tokens in suptokens
        tokens = [begin_sequence; incomplete_tokens; [:end]]
        for i in 1:(length(tokens) - order)
            state = tokens[i:i+order-1]
            token = tokens[i+order]
            token_counts = get!(nodes, state, Dict())
            token_counts[token] = get(token_counts, token, 0) + weight(state, token)
        end
    end
    return Model(order, nodes)
end

"""
    walk(model::Model)

Return an array of tokens obtained by a random walk through the Markov chain.
The walk starts at state `[:begin, :begin...]` (the length depends on
the order of the supplied `model`) and ends once a special token `:end`
is reached.

See also: [`walk2`](@ref).
"""
function walk(model::Model{Any})
    return walker(model, begseq(model.order), [])
end

"""
    walk(model::Model{T}[, init_state::State{T}]) where T

Return an array of tokens obtained by a random walk through the Markov chain.
The walk starts at state `init_state` and ends once a special
token `:end` is reached.

See also: [`walk2`](@ref).
"""
function walk(model::Model{T}, init_state::State{T}) where T
    return walker(model, init_state, init_state)
end

"""
    states_with_suffix(model::Model{T}, init_suffix::Vector{Tokens{T}}) where T

Return all of the states of `model` that end with `init_suffix`. If
the number of such states is 1 (or 0), the function shortens the suffix
(cuts the first token) in order to lower the requirements, and makes another try.
"""
function states_with_suffix(model::Model{T}, init_suffix::Vector{T}) where T
    hassuffix(ar, suffix) = ar[end-length(suffix)+1:end] == suffix

    function helper(suffix)
        states = [k for k in keys(model.nodes) if hassuffix(k, suffix)]
        if (length(states) > 1) || (length(suffix) <= 1)
            return states
        else
            return helper(suffix[2:end])
        end
    end

    return helper(init_suffix)
end

"""
    walk2(model::Model{Any})

Return an array of tokens obtained by a random walk through the Markov chain.
When there is only one state following the current one (i.e. there is 100%
chance that the state will become the next one), the function shortens
the current `State` as to lower the requirements and obtain more randomness.
The `State` gets shortened until a state with at least two possible
successors is found (or until `State` is only one token long).

The walk starts at state `[:begin, :begin...]` (the length depends on
the order of the supplied `model`) and ends once a special token `:end`
is reached.

See also: [`walk`](@ref).
"""
function walk2(model::Model{Any})
    newstate = rand ∘ (suf -> states_with_suffix(model, suf)) ∘ append_token
    return walker(model, begseq(model.order), [], newstate)
end

"""
    walk2(model::Model{T}[, init_state::State{T}]) where T

Return an array of tokens obtained by a random walk through the Markov chain.
When there is only one state following the current one (i.e. there is 100%
chance that the state will become the next one), the function shortens
the current `State` as to lower the requirements and obtain more randomness.
The `State` gets shortened until a state with at least two possible
successors is found (or until `State` is only one token long).

The walk starts at state `init_state` and ends once a special
token `:end` is reached.

See also: [`walk`](@ref).
"""
function walk2(model::Model{T}, init_state::State{T}) where T
    newstate = rand ∘ (suf -> states_with_suffix(model, suf)) ∘ append_token
    return walker(model, init_state, init_state, newstate)
end

"""
    append_token(state::State{T}, token::Token{T}) where T

Drop the first element in `state` and append
the `token` at the end of the `state` array.
"""
function append_token(state::State{T}, token::Token{T}) where T
    return [state[2:end]; [token]]
end

"""
    walker(model::Model{T}, init_state::State{T}, init_accum, newstate=append_token) where T

Return an array of tokens obtained by a random walk through the Markov chain.
The walk starts at state `init_state` and ends once a special token `:end`
is reached. A function `newstate` of general type
`func(state::State{T}, token::Token{T})::State{T} where T` can be supplied
to be used to generate a new state given the old state and the following token.

This is a general function which is used by all the `walk` functions.

See also: [`walk`](@ref), [`walk2`](@ref).
"""
function walker(model::Model{T}, init_state::State{T}, init_accum, newstate=append_token) where T
    function helper(state, accum)
        token = next_token(model, state)
        if token == :end
            return accum
        end
        return helper(newstate(state, token), push!(accum, token))
    end

    return helper(init_state, init_accum)
end

"""
    state_with_beginning(model::Model{T}, tokens::Vector{Token{T}}; strict=false) where T

Attempts to return a random valid state of `model` that begins with `tokens`.
If `strict` is `false` and the `model` doesn't have any state that begins
with `tokens`, the function shortens the tokens (cuts the last token)
to lower the requirements and tries to find some valid state again.
"""
function state_with_beginning(model::Model{T}, tokens::Vector{Token{T}}; strict=false) where T
    if length(tokens) > model.order
        message =
            "The length of the initial state must be equal" *
            "to or lower than the order of the model (i.e. $(model.order))"
        throw(DomainError(tokens, message))
    end

    if haskey(model.nodes, [begseq(model.order - length(tokens)); tokens])
        return tokens
    end

    hasprefix(ar, prefix) = ar[1:length(prefix)] == prefix
    function helper(prefix, states)
        if prefix == [] return nothing end
        states_with_prefix = (st for st in states if hasprefix(st, prefix))
        if !isempty(states_with_prefix)
            return states_with_prefix
        elseif strict
            return nothing
        else
            return helper(prefix[1:end-1], states)
        end
    end

    valid_states = helper(tokens, keys(model.nodes))
    if valid_states != nothing
        return rand(collect(valid_states))
    else
        return nothing
    end
end

"""
    next_token(model::Model{T}, state::State{T}) where T

Return a token which will come after the current state, at random.
The probabilities of individual tokens getting choosed
are skewed by their individual values in the `TokenOccurences` dictionary
of the current `state`, that is obtained from the `model`.
"""
function next_token(model::Model{T}, state::State{T}) where T
    randkey(model.nodes[state])
end

"""
    randkey(dict::AbstractDict{Any, Number})

Return a random key from `dict`. The probabilities of individual keys
getting chosen are skewed by their respective values.
"""
function randkey(dict::AbstractDict{Any, Number})
    possibility_weights = accumulate(+, collect(values(dict)))
    index = indexof(possibility_weights, rand() * possibility_weights[end])
    return collect(keys(dict))[index]
end

"""
    indexof(array::AbstractVector{T}, n::T) where T

Given a sorted `array`, return the index on which `n` would be inserted in
should the insertion preserve the sorting.
"""
function indexof(array::AbstractVector{T}, n::T) where T
    for i in 1:length(array)
        if array[i] >= n
            return i
        end
    end
    return length(array) + 1
end

end

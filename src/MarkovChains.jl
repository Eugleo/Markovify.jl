module MarkovChains

export build, walk, walk2, combine, state_with_beginning

struct Model
    order::Int
    nodes::Dict{Array{Union{Symbol, String}}, Dict{Union{String, Symbol}, Int}}
end

function combine(chain::Model, others::Model...)
    nodes = merge(chain.nodes for chain in others)
    return Model(chain.order, nodes)
end

begseq(n) = fill(:begin, n)

stdweight(state, token) = 1

function build(suptokens; order=2, weight=stdweight)
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

function walk(model)
    return walker(model, begseq(model.order), [])
end

function walk(model, init_state)
    return walker(model, init_state, init_state)
end

function states_with_suffix(model, init_suffix)
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

function walk2(model)
    newstate = rand ∘ (suf -> states_with_suffix(model, suf)) ∘ append_token
    return walker(model, begseq(model.order), [], newstate)
end

function walk2(model, init_state)
    newstate = rand ∘ (suf -> states_with_suffix(model, suf)) ∘ append_token
    return walker(model, init_state, init_state, newstate)
end

append_token(state, token) = [state[2:end]; [token]]

function walker(model, init_state, init_accum, newstate=append_token)
    function helper(state, accum)
        token = next_token(model, state)
        if token == :end
            return accum
        end
        return helper(newstate(state, token), push!(accum, token))
    end

    return helper(init_state, init_accum)
end

function state_with_beginning(model, tokens; strict=false)
    if length(tokens) > model.order
        message = "The length of the initial state must be equal to or lower than the order of the model (i.e. $(model.order))"
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

function next_token(model, state)
    randkey(model.nodes[state])
end

function randkey(dict)
    possibility_weights = accumulate(+, collect(values(dict)))
    index = indexof(possibility_weights, rand() * possibility_weights[end])
    return collect(keys(dict))[index]
end

function indexof(array, n)
    for i in 1:length(array)
        if array[i] >= n
            return i
        end
    end
    return length(array) + 1
end

end

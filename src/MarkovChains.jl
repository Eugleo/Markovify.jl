module MarkovChains

export build, walk, combine

struct Model
    order::Int
    body::Dict{Array{Union{Symbol, String}}, Dict{Union{String, Symbol}, Int}}
end

function combine(chain::Chain, others::Chain...)
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
        for i in 1:(length(tokens_complete) - order)
            state = tokens[i:i+order-1]
            token = tokens[i+order]
            token_counts = get!(nodes, state, Dict())
            token_counts[token] = get(token_counts, token, 0) +  weight(state, token)
        end
    end
    return Model(order, nodes)
end

function walk(model)
    current_state = begseq(model.order)
    result = []
    while true
        following = next_state(model, current_state)
        if following == :end
            break;
        end
        push!(result, following)
        current_state = [current_state[2:end]; [following]]
    end
    return result
end

function rand_walk(model)
    function helper(suffix)
        states = [k for k in keys(model.body) if hassuffix(k, suffix)]
        if (length(states) > 1) || (length(suffix) <= 1)
            return states
        else
            return helper(suffix[2:end])
        end
    end

    current_state = begseq(model.order)
    result = []
    while true
        following = next_state(model, current_state)
        if following == :end
            break;
        end
        push!(result, following)
        current_state = rand(helper(vcat(current_state[2:end], [following])))
    end
    return result
end

function walk(model, init_state)
    current_state = init_state
    result = copy(init_state)
    while true
        following = next_state(model, current_state)
        if following == :end
            break;
        end
        push!(result, following)
        current_state = vcat(current_state[2:end], [following])
    end
    return result
end

function gen_init_state(model, tokens)
    function helper(prefix, as)
        if prefix == []
            return nothing
        end
        if any(hasprefix(a, prefix) for a in as)
            return prefix
        else
            return helper(prefix[1:end-1], as)
        end
    end

    if haskey(model.body, [begseq(model.order-length(tokens));tokens])
        return tokens
    end
    valid_prefix = helper(tokens, collect(keys(model.body)))
    if valid_prefix != nothing
        return rand([k for k in keys(model.body) if hasprefix(k, valid_prefix)])
    else
        return nothing
    end
end

hasprefix(ar, prefix) = ar[1:length(prefix)] == prefix
hassuffix(ar, suffix) = ar[end-length(suffix)+1:end] == suffix

function next_state(model, current_state)
    weighted_rand(model.body[current_state])
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
end

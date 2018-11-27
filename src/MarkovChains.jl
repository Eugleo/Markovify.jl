module MarkovChains

export getmodel, walk, combine

mutable struct Model
    order::Int
    body::Dict{Array{Union{Symbol, String}}, Dict{Union{String, Symbol}, Int}}
end

function combine(model1, model2)
    body = merge(model1.body, model2.body)
    return Model(model1.order, body)
end

begseq(n) = fill(:begin, n)

stdweight(state, current_word) = 1

function getmodel(loltokens; order=2, weightf=stdweight)
    model = Model(order, Dict())
    begkey = begseq(order)
    model.body[begkey] = Dict()
    for tokens in loltokens
        complete = [begkey; tokens; [:end]]
        for i in 1:(length(complete) - order)
            state = complete[i:i+order-1]
            following = complete[i+order]
            statedict = get!(model.body, state, Dict())
            if !haskey(statedict, following)
                statedict[following] = 0
            end
            statedict[following] += weightf(state, following)
        end
    end
    return model
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
        current_state = vcat(current_state[2:end], [following])
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

function weighted_rand(sourcedict)
    possibilities = accumulate(+, collect(values(sourcedict)))
    r = rand() * possibilities[end]
    return copy(collect(keys(sourcedict)))[putinto(r, possibilities)]
end

function putinto(n, ar)
    for (i, el) in enumerate(ar)
        if n < el
            return i
        end
    end
    return length(ar)
end

end

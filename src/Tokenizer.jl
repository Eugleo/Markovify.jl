module Tokenizer

export tokenize,
       to_lines,
       to_sentences,
       to_letters,
       cleanup,
       words,
       letters,
       lines

Tokens{T} = Vector{T}
SupTokens{T} = Vector{Vector{T}}

function tokenize(text; func=letters)
    return func(text)
end

function to_lines(text)
    return split(text, "\n")
end

function to_sentences(text)
    rule = r"((?<=[.])\s*(?=[A-Z]))|((?<=[?!])\s*)"
    split(text, rule; keepempty=false)
end

function to_letters(tokens::Tokens{String})
    return [split(token, "") for token in tokens]
end

function to_words(tokens::Tokens{String}; keeppunctuation=true)
    rule = if keeppunctuation r"\s+" else r"\W+" end
    return [split(token, rule; keepempty=false) for token in tokens]
end

function cleanup(suptokens::SupTokens{String}; badchars="\n-_()[]{}<>–—\$=\'\"„“\r\t")
    cleanup_token(token) = filter(c -> !(c in badchars), token)
    return [
        [cleanup_token(token) for token in suptoken if cleanup_token(token) != ""]
        for suptoken in suptokens
    ]
end

letters = cleanup ∘ to_letters ∘ to_sentences
lines = cleanup ∘ to_letters ∘ to_lines
words = cleanup ∘ to_words ∘ to_sentences

end

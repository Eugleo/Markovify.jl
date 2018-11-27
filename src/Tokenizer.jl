module Tokenizer

export tokenize, spliton_letters, spliton_sentences, spliton_words, WORDS, LETTERS, LINES

function tokenize(text; fs=WORDS)
    return helper(fs, text)
end

function helper(fs, x)
    if fs == []
        return x
    end
    return helper(fs[2:end], fs[1](x))
end

function cleanup(s)
    return filter(c -> !(c in "\n-_()[]{}<>–—\$=\'\"„“\r\t"), s)
end

function spliton_sentences(text)
    rule = r"((?<=[.])\s*(?=[A-Z]))|((?<=[?!])\s*)"
    split(text, rule; keepempty=false)
end

function spliton_words(text; keeppunctuation=true)
    rule = if keeppunctuation r"\s+" else r"\W+" end
    split(text, rule; keepempty=false)
end

function spliton_letters(text)
    split(text, "")
end

LETTERS = [spliton_sentences, x -> map(spliton_letters, x), s -> map(ws -> filter(p->p!="", map(cleanup, ws)), s)]
WORDS = [spliton_sentences, s -> map(spliton_words, s), s -> map(ws -> map(cleanup, ws), s)]
LINES = [x -> split(x, "\n"), x -> map(spliton_letters, x), s -> map(ws -> filter(p->p!="", map(cleanup, ws)), s)]

end

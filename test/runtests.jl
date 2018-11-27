module Tests

include("../src/Tokenizer.jl")
using .Tokenizer, Test

tokenizer_text = "Ahoj,\njsem Evžen.Kdo jsi ty?"

@test tokenize(tokenizer_text; func=letters) == [
    ["A", "h", "o", "j", ",", "j", "s", "e", "m", " ", "E", "v", "ž", "e", "n", "."],
    ["K", "d", "o", " ", "j", "s", "i", " ", "t", "y", "?"]
]

@test tokenize(tokenizer_text; func=lines) == [
    ["A", "h", "o", "j", ","],
    ["j", "s", "e", "m", " ",
     "E", "v", "ž", "e", "n", ".",
     "K", "d", "o", " ",
     "j", "s", "i", " ",
     "t", "y", "?"]
]

end

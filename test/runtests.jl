module Tests

include("../src/Tokenizer.jl")
include("../src/MarkovChains.jl")
using .Tokenizer, .MarkovChains, Test

#=

Tests for the module Tokenizer

=#

text = "ABC.DAB.\n ACDA"

@test tokenize(text, letters) == [
    ["A", "B", "C", "."],
    ["D", "A", "B", "."],
    ["A", "C", "D", "A"],
]

@test tokenize(text, lines) == [
    ["A", "B", "C", ".", "D", "A", "B", "."],
    [" ", "A", "C", "D", "A"]
]

#=

Tests for the module MarkovChains

=#

tokens = tokenize(text, letters)
model = build(tokens; order=1)

@test model.nodes ==
    Dict(
        ["A"] =>    Dict("B" => 2, "C" => 1, :end => 1),
        ["B"] =>    Dict("C" => 1, "." => 1),
        ["C"] =>    Dict("D" => 1,"." => 1),
        ["D"] =>    Dict("A" => 2),
        [:begin] => Dict("A" => 2,"D" => 1),
        ["."] =>    Dict(:end => 2)
    )

@test walk(model, ["A"])[1] == "A"

@test_throws KeyError walk(model, ["E"])

model2 = build(tokens; order=2)

@test MarkovChains.states_with_suffix(model2, ["."]) == [
    ["B", "."],
    ["C", "."]
]

@test MarkovChains.state_with_beginning(model2, ["B"]) in [
    ["B", "."],
    ["B", "C"]
]

@test MarkovChains.indexof(collect(-1:12), 10) == 12
end

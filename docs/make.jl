push!(LOAD_PATH, "../src/")
using Documenter, MarkovChains, Tokenizer

makedocs(
    sitename="MarkovChains.jl",
     pages = [
        "Domovská stránka" => "index.md",
        "Osvětlení" => [
            "Popis funkce" => "function.md",
            "Popis implementace" => "implementation.md"
        ],
        "Knihovna" => [
            "Veřejné symboly (EN)" => "public.md",
            "Interní symboly (EN)" => "internals.md"
        ]
    ]
 )

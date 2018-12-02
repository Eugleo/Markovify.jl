push!(LOAD_PATH, "../src/")
using Documenter, MarkovChains, Tokenizer

makedocs(
    sitename="MarkovChains.jl",
    assets=["assets/favicon.ico"],
    authors = "Evžen Wybitul",
    pages = [
        "Domovská stránka" => "index.md",
        "Vysvětlení" => [
            "Popis funkce" => "function.md",
            "Popis implementace" => "implementation.md"
        ],
        "Knihovna" => [
            "Veřejné symboly (EN)" => "public.md",
            "Interní symboly (EN)" => "internals.md"
        ]
    ]
 )

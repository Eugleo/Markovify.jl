# MarkovChains.jl

Generování náhodného textu na bázi textu trénovacího.

!!! note "Poznámka"
    V této sekci jsou popsány důvody, které vedly ke vzniku tohto balíčku. Konkrétní funkce jsou zdokumentovány v oddílu Library, konkrétně [Public Documentation](@ref) a [Internal Documentation](@ref).

## K čemu tento balík slouží

Hlavním úkolem tohoto balíčku je nabídnout kladnou odpověď na otázku: "Může nějaký program vyloudit úsměv na tváři?" — a to i z jiného důvodu, než je kvalita jeho kódu. Konkrétně se jedná o co možná nejobecnější implementaci Markovových řetězců, sloužící ke generování náhodného textu jakéhokoliv rozsahu na základě vstupních dat.

Pár správných textových souborů a tento balíček je vše, co vám stačí ke generování jmen, náhodných slov,
vět, i delších textů, a to v jakémkoli jazyce. Balíček je navrhnut tak, aby se dal použít na co možná nejširší škálu problémů.

## Přesný popis funkce

Balíček slouží k vytvoření Markovova řetězce daného řádu ze vstupního textu. Pomocí tohoto *modelu* je poté možné generovat náhodný text, který sdílí s původním textem určité vlastnosti (konkrétně popsáno v oddílu [Popis principu funkce](@ref)).

Protože Markovovy řetězce umí tento balíček stavět pouze z textu rozděleného na části, takzvané *tokeny*, poskytuje současně kromě Markovových řetězců i několik základních funkcí, pomocí kterých je možno jakýkoli text na vhodné tokeny rozdělit. Kromě toho je rovnou při rozdělování možno vstupní text zbavit nežádoucích znaků (viz dokumentace modulu `Tokenizer` v oddílu [Public Documentation](@ref pub_tokenizer)). Další funkce na rozdělování textu, stejně jako funkce na čištění vstupu, si může uživatel jednoduše nadefinovat sám a říct funkcím modulu `Tokenizer`, ať pracují s nimi místo s funkcemi výchozími. Poskytované funkce by nicméně měly stačit na většinu běžných vstupů.

Jakmile je text rozdělený na tokeny, je možné z něj vytvořit *model*. Model je nepřesnou reprezentací Markovova řetězce přizpůsobeného ke generování náhodného textu (viz oddíl [Popis principu funkce](@ref)). Balíček poskytuje několik funkcí, které umí na základě modelu vygenerovat text, který má podobné charakteristiky jako text původní. Kvalita modelu závisí na jeho řádu, při vyšším řádu je ovšem nutné dodat větší množství trénovacího textu, jinak má generovaný text tendenci ztrácet svůj náhodný charakter.

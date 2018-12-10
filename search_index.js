var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Domovská stránka",
    "title": "Domovská stránka",
    "category": "page",
    "text": ""
},

{
    "location": "#MarkovChains.jl-1",
    "page": "Domovská stránka",
    "title": "MarkovChains.jl",
    "category": "section",
    "text": "Generování náhodného textu na bázi textu trénovacího.note: Poznámka\nV této sekci jsou popsány důvody, které vedly ke vzniku tohto balíčku. Konkrétní funkce jsou zdokumentovány v oddílu Library, konkrétně Public Documentation a Internal Documentation."
},

{
    "location": "#K-čemu-tento-balík-slouží-1",
    "page": "Domovská stránka",
    "title": "K čemu tento balík slouží",
    "category": "section",
    "text": "Hlavním úkolem tohoto balíčku je nabídnout kladnou odpověď na otázku: \"Může nějaký program vyloudit úsměv na tváři?\" — a to i z jiného důvodu, než je kvalita jeho kódu. Konkrétně se jedná o co možná nejobecnější implementaci Markovových řetězců, sloužící ke generování náhodného textu jakéhokoliv rozsahu na základě vstupních dat.Pár správných textových souborů a tento balíček je vše, co vám stačí ke generování jmen, náhodných slov, vět, i delších textů, a to v jakémkoli jazyce. Balíček je navrhnut tak, aby se dal použít na co možná nejširší škálu problémů."
},

{
    "location": "#Přesný-popis-funkce-1",
    "page": "Domovská stránka",
    "title": "Přesný popis funkce",
    "category": "section",
    "text": "Balíček slouží k vytvoření Markovova řetězce daného řádu ze vstupního textu. Pomocí tohoto modelu je poté možné generovat náhodný text, který sdílí s původním textem určité vlastnosti (konkrétně popsáno v oddílu Popis principu funkce).Protože Markovovy řetězce umí tento balíček stavět pouze z textu rozděleného na části, takzvané tokeny, poskytuje současně kromě Markovových řetězců i několik základních funkcí, pomocí kterých je možno jakýkoli text na vhodné tokeny rozdělit. Kromě toho je rovnou při rozdělování možno vstupní text zbavit nežádoucích znaků (viz dokumentace modulu Tokenizer v oddílu Public Documentation). Další funkce na rozdělování textu, stejně jako funkce na čištění vstupu, si může uživatel jednoduše nadefinovat sám a říct funkcím modulu Tokenizer, ať pracují s nimi místo s funkcemi výchozími. Poskytované funkce by nicméně měly stačit na většinu běžných vstupů.Jakmile je text rozdělený na tokeny, je možné z něj vytvořit model. Model je nepřesnou reprezentací Markovova řetězce přizpůsobeného ke generování náhodného textu (viz oddíl Popis principu funkce). Balíček poskytuje několik funkcí, které umí na základě modelu vygenerovat text, který má podobné charakteristiky jako text původní. Kvalita modelu závisí na jeho řádu, při vyšším řádu je ovšem nutné dodat větší množství trénovacího textu, jinak má generovaný text tendenci ztrácet svůj náhodný charakter."
},

{
    "location": "function/#",
    "page": "Princip",
    "title": "Princip",
    "category": "page",
    "text": ""
},

{
    "location": "function/#Popis-principu-funkce-1",
    "page": "Princip",
    "title": "Popis principu funkce",
    "category": "section",
    "text": "note: Poznámka\nTento text pojednává o obecném principu stojícímu za Markovovými řetězci a generováním textu z nich. Naopak implementaci tohoto obecného principu se věnuje oddíl Popis implementace."
},

{
    "location": "function/#Markovův-řetězec-1",
    "page": "Princip",
    "title": "Markovův řetězec",
    "category": "section",
    "text": "Stacionární Markovův řetězec (dále Markovův řetězec) je uspořádaná posloupnost n náhodných proměnných X_1 X_2 ldots X_n.[1] Ty mohou nabývat jedné z konečné množiny hodnot; hodnotu náhodné proměnné X_i budeme značit x_i a nazveme ji stav v okamžiku i. Množinu všech možných stavů označíme jako stavový prostor. Pro všechny X_i (i1) platí, že:PleftX_i = x vert X_1=x_1 X_2=x_2 ldots X_i-1 = x_i-1right = PleftX_i = x vert X_i-1 = x_i-1rightJinými slovy, stav v okamžiku i závisí pouze na stavu v předchozím okamžiku.Tato takzvaná markovovská vlastnost dala Markovově řetězci jeho jméno. Dovoluje nám znázornit celý systém orientovaným grafem, ve kterém vrcholy představují jednotlivé stavy systému a hrany mají hodnoty pravděpodobností přechodů z jednoho stavu do druhého. Pro úplnost dodáváme, že Markovův řetězec se dá kromě grafu popsat také maticí pravděpodobností přechodu P, kde p_ij označuje pravděpodobnost přechodu ze stavu i do stavu j.Pojem Markovův řetězec se dá dále rozšířit o takzvaný řád. Stav v okamžiku i v Markovově řetězci o řádu r závisí na všech stavech X_i-1 X_i-2 ldots X_i-r."
},

{
    "location": "function/#Generování-textu-1",
    "page": "Princip",
    "title": "Generování textu",
    "category": "section",
    "text": "Proces generování textu pomocí Markovova řetězce se skládá ze dvou částí:Vytvoření samotného řetězce na základě vstupního textu.\nProcházení vytvořeným grafem a postupné tvoření výstupu."
},

{
    "location": "function/#Vytvoření-grafu-1",
    "page": "Princip",
    "title": "Vytvoření grafu",
    "category": "section",
    "text": "Daný text je před modelováním nutné rozložit na tokeny: většinou slova, případně někdy jednotlivé znaky.Text se poré zpravidla modeluje řetězcem o řádu 2, 3, nebo 4; obecně k. Stavový prostor bude tvořen všemi k-ticemi tokenů, které se vyskytují ve vstupním textu: to budou vrcholy požadovaného grafu. Vyplatí se také nějak označit začátek a konec textu, třeba jako speciální stavy.Hrany (a jejich hodnoty) pak budou udávat, s jakou pravděpodobností se vyskytuje jedna k-tice tokenů \"za\" jinou. Slovo \"za\" je v uvozovkách, neboť k-tice se překrývají a dvě následné k-tice se tedy liší pouze v jednom znaku.tip: Příklad\nMějme vstupní text \"ABABD\". Markovův řetězec o řádu 2 tohoto textu by se dal grafem znázornit takto:(Image: Znázornění druhého Markovova řetězce grafem)"
},

{
    "location": "function/#Procházení-grafu-1",
    "page": "Princip",
    "title": "Procházení grafu",
    "category": "section",
    "text": "Pokud máme k dispozici graf, je generování textu už velice jednoduché: začneme na jednom z vrcholů označených jako začátek a pak se pohybujeme po hranách, dokud nenarazíme na vrchol konec. Po hranách se pohybujeme náhodně, přičemž hrany svými hodnotami ovlivňují rozložení pravděpodobností přesunu z jednoho stavu do druhého.tip: Příklad\nPokud použijeme graf z minulého příkladu, generování textu by mohlo probíhat například takto:začátek longrightarrow AB longrightarrow BA longrightarrow AB longrightarrow BA longrightarrow AB longrightarrow BD longrightarrow konecVýsledný text poté nebude prostým složením stavů, které jsme prošli (neboť ty se částečně překrývaly), ale bude vypadat takto: \"ABABABD\".[1]: Existují také řetězce nestacionární, kterým se rozložení pravděpodobností mění ještě v závislosti na okamžiku i. Ty ale nejsou předmětem našeho zájmu, neboť slouží k modelování dynamičtějších systémů než je text."
},

{
    "location": "implementation/#",
    "page": "Implementace",
    "title": "Implementace",
    "category": "page",
    "text": ""
},

{
    "location": "implementation/#Popis-implementace-1",
    "page": "Implementace",
    "title": "Popis implementace",
    "category": "section",
    "text": "note: Poznámka\nTento text pojednává o konkrétní implementaci Markovova řetězce v tomto balíčku. Naopak obecnému principu se věnuje oddíl Popis principu funkce.Generování textu se dá rozdělit na několik logických podcelků:Rozložení textu na tokeny.\nTrénování modelu na základě tokenů.\nProcházení modelového grafu."
},

{
    "location": "implementation/#Rozložení-textu-na-tokeny-1",
    "page": "Implementace",
    "title": "Rozložení textu na tokeny",
    "category": "section",
    "text": "Text je před zpracováním nutno rozdělit na menší celky. Má konkrétní implementace modelu počítá s tím, že text bude rozložen na pole polí tokenů, například tedy: PoleVět{PoleSlov{Slova/Tokeny}}. K tomu slouží modul Tokenizer (dokumentace v oddílu Public Documentation), který nabízí několik jednoduchých \"kombinátorů\", které může uživatel použít k rozdělení textu podle vět, řádků, slov a podobně. Jejich implementace není ničím zajímavá, jedná se o one-line funkce pracující na základě regexů."
},

{
    "location": "implementation/#Trénování-modelu-na-základě-tokenů-1",
    "page": "Implementace",
    "title": "Trénování modelu na základě tokenů",
    "category": "section",
    "text": "Reprezentovat model grafem je zbytečně složité; hlavně implementačně, protože se jedná o rekurzivní datovou strukturu. Je proto vhodné převést tuto ústřední datovou strukturu na jinou, se kterou se v kódu lépe pracuje."
},

{
    "location": "implementation/#Datové-struktury-1",
    "page": "Implementace",
    "title": "Datové struktury",
    "category": "section",
    "text": "Pro zjednodušení je možné využít toho, že dva po sobě jdoucí stavy se liší pouze o jeden token. Celý graf pak jde převést na slovník párující vždy nějaký stav se všemi tokeny, které se po něm vyskytují.Pokud zadefinuji pomocné datové struktury State a TokenOccurencesState{T} = Vector{Token{T}}\nTokenOccurences{T} = Dict{Token{T}, Int}mohu graf/Markovův řetězec/model implementovat následovněstruct Model{T}\n    order::Int\n    nodes::Dict{State{T}, TokenOccurences{T}}\nend"
},

{
    "location": "implementation/#Trénování-1",
    "page": "Implementace",
    "title": "Trénování",
    "category": "section",
    "text": "Vstupní tokeny je nutno zanalyzovat a vytvořit z nich Model. K tomu slouží konstruktor Model. Každý model má pevně určený řád (order), který je nutné této funkci předat jako argument.Funkce poté prochází jednotlivá pole tokenů, vždy zkoumák-tici tokenů v jednom poli — ta tvoří stav. Tento stav bude klíčem ve slovníku nodes — všechny klíče tohoto slovníku tvoří kompletní stavový prostor Markovova řetězce. Hodnota pod tímto klíčem bude další slovník, konkrétně slovník TokenOccurences párující vždy token a číslo představující počet, kolikrát se tento token za daným stavem vyskytl (>=1).Ještě před touto analýzou tokenů je nutné doplnit některé tokeny pomocné, konkrétně symboly :begin a :end, které vyznačují začátek a konec \"věty\" (tedy jednoho z dílčích polí). Každé pole tedy bude vypadat takto: [:begin :begin ... :begin token token ... token :end].Účel symbolu :end je jednoduchý: ukončuje náhodné procházení modelu ve funkci walk.\nPočet symbolů :begin na začátku pole je roven řádu celého řetězce. To je nutné proto, abych nemusel ukládat počáteční stavy do speciální proměnné. Klíče i hodnoty slovníku by totiž měly mít všechny stejný typ.Původně měla struktura Model ještě jedno pole, které bylo speciálně vyhrazené pro počáteční stavy (a :begin nebylo používáno). Nastal by pak ale drobný problém, kdyby uživatel chtěl využít externí balíček pro ukládání do souboru JSON, protože Model by byl reprezentován dvěma slovníky a bylo by nutné toto při ukládání ošeřit. Uchýlil jsem se proto v pozdějších verzích k tomuto jednoslovníkovému řešení; uživateli teď stačí uložit do souboru pouze slovník nodes a využít funkci Model k opětovné rekonstrukci modelu.Místo symbolu :begin byl využíván v dřívějších verzích přímo string \"~~BEGIN~~\". Pokud by však uživatel z nějakého důvodu toto slovo měl ve vstupním textu, byl by klidně i prostředek věty omylem pokládán za počáteční stav. Z toho důvodu nakonec používám datový typ Symbol, který je podobný symbolům v LISP."
},

{
    "location": "implementation/#Procházení-modelového-grafu-1",
    "page": "Implementace",
    "title": "Procházení modelového grafu",
    "category": "section",
    "text": "K procházení grafu a generování náhodného textu slouží funkce walk a walk2. Z modelu získjí jeho slovník všech stavů, nodes. Generování začne ve stavu [:begin :begin ... :begin] a poté postupuje po krocích dále (\"krok\" viz níže). Jakmile narazí na token :end, vrátí vybudované pole tokenů.Co je krok:Nacházíme se v nějakém stavu.\nKoukneme se do slovníku nodes na všechny možné tokeny, které následují po současném stavu.\nVybereme jeden z nich. Způsob výběru je náhodný, řídí se ale relativními četnostmi jednotlivých tokenů za daným stavem. Pokud je nodes[současný_stav] rovno Dict(A => 2, B => 1), je šance, že zvolený token bude A, dvakrát vyšší, než že to bude B.\nVybraný token zařadíme za současný stav (který je jen polem tokenů) a odstraníme z něj zároveň token, který je na začátku. Toto označíme jako nový stav (má stejnou délku jako ten starý) a jdeme na bod 1.Jak funguje pseudonáhodný výběr ze slovníku:Uděláme postupný součet všech četností jednotlivých tokenů. Tj, pro Dict(A => 2, B => 1, C => 5) bychom vytvořili pole [2, 3, 8].\nVygenerujeme náhodné číslo v rozmezí od nuly do nejvyššího čísla tohoto pole a pokusíme se ho zařadit do tohoto pole tak, aby pole zůstalo seřazené. Pravděpodobnost výběru daného čísla je tak v poměru k jeho četnosti.\nIndex, na který bychom číslo umístili, použijeme jako index následujícího tokenu."
},

{
    "location": "lipsum/#",
    "page": "Lorem ipsum",
    "title": "Lorem ipsum",
    "category": "page",
    "text": ""
},

{
    "location": "lipsum/#Lorem-ipsum-1",
    "page": "Lorem ipsum",
    "title": "Lorem ipsum",
    "category": "section",
    "text": "note: Poznámka\nV této sekci najdete krátkou demonstraci toho, jak lze můj balíček používat.Lorem ipsum je souhrnné označení pro text, který se sice podobá reálnému textu svou stavbou (tedy délkou slov, vět, poměrem samohlásek/souhlásek), ale který nedává smysl. Takový text se používá například v designu nebo typografii, kde by smysluplný text jen odváděl pozoronost. Originální lorem ipsum je latinský text, jehož první věta Lorem ipsum dolor sit amet, consectetur adipisici elit připomíná úsek z Ciceronovy tvorby."
},

{
    "location": "lipsum/#Program-1",
    "page": "Lorem ipsum",
    "title": "Program",
    "category": "section",
    "text": "Chceme vyprodukovat vlastní lorem ipsum, jedno ve francouzštině a druhé v němčině, abychom viděli, jak bude náš layout na plakát fungovat s různými jazyky. Trénovací texty uložíme do složky assets/corpora/*jazyk*/ pod názvy src1.txt až src3.txt.[1]Obecně se každý program bude držet následující struktury:Načíst text a převést jej do tokenů.\nNatrénovat na tokenech model Markovova řetězce.\nVygenerovat text pomocí modelu.Nejprve je nutné importovat oba moduly, které tento balíček obsahuje. Pomocí klíčového slova using je naimportujete včetně jejich exportovaných symbolů. Pozn: Ve vašem programu pište jména modulů bez tečky před jménem.include(\"../src/Tokenizer.jl\") #hide\ninclude(\"../src/MarkovChains.jl\") #hide\n\nusing .MarkovChains\nusing .Tokenizer\n\nfilenames_fr = [\n    \"assets/corpora/french/src1.txt\",\n    \"assets/corpora/french/src2.txt\",\n    \"assets/corpora/french/src3.txt\"\n]\n\nfilenames_de = [\n    \"assets/corpora/german/src1.txt\",\n    \"assets/corpora/german/src2.txt\",\n    \"assets/corpora/german/src3.txt\"\n]\n\nnothing #hideModelové texty, na kterých se bude náš řetězec trénovat, máme uložené v několika souborech. Je tedy dobré definovat funkci, která bude umět postavit modely i z více souborů. Tyto modely poté můžeme spojit pomocí funkce combine.Protože funkce Model očekává pole polí tokenů, musíme text tokenizovat. K tomu využijeme funkcí tokenize a words. Tím dokončíme krok 1.function loadfiles(filenames)\n    # Return an iterator\n    return (\n        open(filename) do f\n            # Tokenize on words\n            tokens = tokenize(read(f, String); on=words)\n            return Model(tokens; order=1)\n        end\n        for filename in filenames\n    )\nend\n\nnothing #hideKdyž už máme model, chtěli bychom pomocí něj vygenerovat náhodné věty. Definujeme tedy pomocnou funkci, která nám pomocí modelu vygeneruje n vět a ještě zkontroluje, zda nejsou moc krátké či dlouhé. Z toho sestává krok 2.function gensentences(model, n)\n    sentences = []\n    # Stop only after n sentences were generated\n    # and passed through the length test\n    while length(sentences) < n\n        seq = walk(model)\n        # Add the sentence to the array iff its length is ok\n        if length(seq) > 5 && length(seq) < 15\n            push!(sentences, join(seq, \" \"))\n        end\n    end\n    # Print each sentence on its own line\n    println(join(sentences, \"\\n\"))\nend\n\nnothing #hideNyní už stačí jen vytvořit a natrénovat model a začít generovat! To je 3. a poslední krok.MODEL_DE = combine(loadfiles(filenames_de)...)\ngensentences(MODEL_DE, 4)A podobně také ve francouzštině:MODEL_FR = combine(loadfiles(filenames_fr)...)\ngensentences(MODEL_FR, 4)[1]: Všechny texty použité v této demonstraci pocházejí z projektu Gutenberg."
},

{
    "location": "public/#",
    "page": "Veřejné symboly (EN)",
    "title": "Veřejné symboly (EN)",
    "category": "page",
    "text": ""
},

{
    "location": "public/#Public-Documentation-1",
    "page": "Veřejné symboly (EN)",
    "title": "Public Documentation",
    "category": "section",
    "text": ""
},

{
    "location": "public/#MarkovChains.Model",
    "page": "Veřejné symboly (EN)",
    "title": "MarkovChains.Model",
    "category": "type",
    "text": "The datastructure of the Markov chain. Encodes all the different states and the probabilities of going from one to another as a dictionary. The keys are the states, the values are the respective TokenOccurences dictionaries. Those are dictionaries which say how many times was a token found immediately after the state.\n\nFields\n\norder is the number of tokens in a State\nnodes is a dictionary pairing State and its respective\n\nTokenOccurences dictionary.\n\n\n\n\n\n"
},

{
    "location": "public/#MarkovChains.Model-Tuple{Any}",
    "page": "Veřejné symboly (EN)",
    "title": "MarkovChains.Model",
    "category": "method",
    "text": "Model(nodes)\n\nReturn a model constructed from nodes. Can be used to reconstruct a model object from its nodes, e.g. if the nodes were saved in a JSON file.\n\n\n\n\n\n"
},

{
    "location": "public/#MarkovChains.Model-Union{Tuple{Array{#s18,1} where #s18<:Array{T,1}}, Tuple{T}} where T",
    "page": "Veřejné symboly (EN)",
    "title": "MarkovChains.Model",
    "category": "method",
    "text": "Model(suptokens::Vector{<:Vector{T}}; order=2, weight=stdweight)\n\nReturn a Model trained on an array of arrays of tokens (suptokens). Optionally an order of the chain can be supplied; that is the number of tokens in one state. A weight function of general type func(::State{T}, ::Token{T}) -> Int can be supplied to be used to bias the weights based on the state or token value.\n\n\n\n\n\n"
},

{
    "location": "public/#MarkovChains.combine-Tuple{Any,Vararg{Any,N} where N}",
    "page": "Veřejné symboly (EN)",
    "title": "MarkovChains.combine",
    "category": "method",
    "text": "combine(chain, others)\n\nReturn a Model which is a combination of all of the models provided. All of the arguments should have the same order. The nodes of all the Models are merged using the function merge.\n\n\n\n\n\n"
},

{
    "location": "public/#MarkovChains.walk-Tuple{Any}",
    "page": "Veřejné symboly (EN)",
    "title": "MarkovChains.walk",
    "category": "method",
    "text": "walk(model[, init_state])\n\nReturn an array of tokens obtained by a random walk through the Markov chain. The walk starts at state init_state if supplied, and at state [:begin, :begin...] (the length depends on the order of the supplied model) otherwise. The walk ends once a special token :end is reached.\n\nSee also: walk2.\n\n\n\n\n\n"
},

{
    "location": "public/#MarkovChains.walk2-Tuple{Any}",
    "page": "Veřejné symboly (EN)",
    "title": "MarkovChains.walk2",
    "category": "method",
    "text": "walk2(model[, init_state])\n\nReturn an array of tokens obtained by a random walk through the Markov chain. When there is only one state following the current one (i.e. there is 100% chance that the state will become the next one), the function shortens the current State as to lower the requirements and obtain more randomness. The State gets shortened until a state with at least two possible successors is found (or until State is only one token long).\n\nThe walk starts at state init_state if supplied, and at state [:begin, :begin...] (the length depends on the order of the supplied model) otherwise. The walk ends once a special token :end is reached.\n\nSee also: walk.\n\n\n\n\n\n"
},

{
    "location": "public/#Module-MarkovChains-1",
    "page": "Veřejné symboly (EN)",
    "title": "Module MarkovChains",
    "category": "section",
    "text": "The following is the documentation of symbols which are exported from the MarkovChains module. The module is used to construct a Markov chain from the given list of lists of tokens and to walk through it, generating a random sequence of tokens along the way. Please see Příklady if you are looking for some usage examples.Modules = [MarkovChains]\nPrivate = false\nOrder   = [:type, :function]"
},

{
    "location": "public/#Tokenizer.cleanup-Tuple{Array{#s19,1} where #s19<:(Array{#s20,1} where #s20<:AbstractString)}",
    "page": "Veřejné symboly (EN)",
    "title": "Tokenizer.cleanup",
    "category": "method",
    "text": "cleanup(suptokens::Vector{<:Vector{<:AbstractString}}; badchars=\"»«\\n-_()[]{}<>–—$=\'\"„“\r	\")\n\nRemove all characters that are in badchars from all tokens in suptokens.\n\n\n\n\n\n"
},

{
    "location": "public/#Tokenizer.letters",
    "page": "Veřejné symboly (EN)",
    "title": "Tokenizer.letters",
    "category": "function",
    "text": "letters = cleanup ∘ to_letters ∘ to_sentences\n\nComposite function which splits its input into sentences, then the sentences into letters, and then removes special characters.\n\n\n\n\n\n"
},

{
    "location": "public/#Tokenizer.lines",
    "page": "Veřejné symboly (EN)",
    "title": "Tokenizer.lines",
    "category": "function",
    "text": "lines = cleanup ∘ to_letters ∘ to_sentences\n\nComposite function which splits its input into lines, then the line into letters, and then removes special characters.\n\n\n\n\n\n"
},

{
    "location": "public/#Tokenizer.to_letters-Tuple{Array{#s12,1} where #s12<:AbstractString}",
    "page": "Veřejné symboly (EN)",
    "title": "Tokenizer.to_letters",
    "category": "method",
    "text": "to_letters(tokens::Vector{<:AbstractString})\n\nSplit all of the tokens in tokens into individual characters.\n\n\n\n\n\n"
},

{
    "location": "public/#Tokenizer.to_lines-Tuple{AbstractString}",
    "page": "Veřejné symboly (EN)",
    "title": "Tokenizer.to_lines",
    "category": "method",
    "text": "to_lines(text::AbstractString)\n\nReturn an array of lines in text.\n\n\n\n\n\n"
},

{
    "location": "public/#Tokenizer.to_sentences-Tuple{AbstractString}",
    "page": "Veřejné symboly (EN)",
    "title": "Tokenizer.to_sentences",
    "category": "method",
    "text": "to_sentences(text::AbstractString)\n\nReturn an array of sentences in text. The text is split along dots; the dots remain in the strings, only the spaces after the dots are stripped.\n\nThe function tries to be as smart as possible. For example, the string \"Channel No. 5 is a perfume.\" will be treated as one sentence, although it has two dots.\n\n\n\n\n\n"
},

{
    "location": "public/#Tokenizer.tokenize-Tuple{Any}",
    "page": "Veřejné symboly (EN)",
    "title": "Tokenizer.tokenize",
    "category": "method",
    "text": "tokenize(text[, on=letters])\n\nSplit text into SupTokens (array of arrays of tokens). An optional function of general type func(::Any) -> Vector{Vector{Any}} can be provided to be used for the tokenization.\n\nFor possible combinators which can be composed to obtain func, see: to_lines, to_sentences, to_letters, to_words, cleanup.\n\n\n\n\n\n"
},

{
    "location": "public/#Tokenizer.words",
    "page": "Veřejné symboly (EN)",
    "title": "Tokenizer.words",
    "category": "function",
    "text": "words = cleanup ∘ to_letters ∘ to_sentences\n\nComposite function which splits its input into sentences, then the sentences into words, and then removes special characters. Please note that dots and commas are not removed.\n\n\n\n\n\n"
},

{
    "location": "public/#pub_tokenizer-1",
    "page": "Veřejné symboly (EN)",
    "title": "Module Tokenizer",
    "category": "section",
    "text": "The following symbols are exported from the Tokenizer module. This module is used to tokenize text into a list of lists of tokens, which is a format better suited for model training.Modules = [Tokenizer]\nPrivate = false\nOrder   = [:type, :function]"
},

{
    "location": "internals/#",
    "page": "Interní symboly (EN)",
    "title": "Interní symboly (EN)",
    "category": "page",
    "text": ""
},

{
    "location": "internals/#Internal-Documentation-1",
    "page": "Interní symboly (EN)",
    "title": "Internal Documentation",
    "category": "section",
    "text": ""
},

{
    "location": "internals/#MarkovChains.Token",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.Token",
    "category": "constant",
    "text": "Token{T} = Union{Symbol, T}\n\nTokens can be of any type. They can also include symbols :begin and :end which are used to denote the beginning and end of a suptoken.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.State",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.State",
    "category": "type",
    "text": "State{T} = Vector{Token{T}}\n\nA state is described by a succession of tokens.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.TokenOccurences",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.TokenOccurences",
    "category": "type",
    "text": "TokenOccurences{T} = Dict{Token{T}, Int}\n\nA dictionary pairing tokens (or special symbols :begin and :end) with the number of their respective occurences.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.append_token-Tuple{Any,Any}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.append_token",
    "category": "method",
    "text": "append_token(state, token)\n\nDrop the first element in state and append the token at the end of the state array.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.begseq-Tuple{Any}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.begseq",
    "category": "method",
    "text": "begseq(n)\n\nReturn the symbol :begin repeated n times. This array is then used as a starting sequence for all suptokens.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.indexin-Tuple{Any,Any}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.indexin",
    "category": "method",
    "text": "indexin(array)\n\nGiven a sorted array, return the index on which n would be inserted in should the insertion preserve the sorting.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.next_token-Union{Tuple{T}, Tuple{Any,Any}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.next_token",
    "category": "method",
    "text": "next_token(model, state)\n\nReturn a token which will come after the current state, at random. The probabilities of individual tokens getting choosed are skewed by their individual values in the TokenOccurences dictionary of the current state, that is obtained from the model.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.randkey-Tuple{Any}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.randkey",
    "category": "method",
    "text": "randkey(dict)\n\nReturn a random key from dict. The probabilities of individual keys getting chosen are skewed by their respective values.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.state_with_prefix-Tuple{Any,Any}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.state_with_prefix",
    "category": "method",
    "text": "state_with_prefix(model, prefix; strict=false)\n\nAttempts to return a random valid state of model that begins with tokens. If strict is false and the model doesn\'t have any state that begins with tokens, the function shortens the tokens (cuts the last token) to lower the requirements and tries to find some valid state again.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.states_with_suffix-Tuple{Any,Any}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.states_with_suffix",
    "category": "method",
    "text": "states_with_suffix(model, init_suffix)\n\nReturn all of the states of model that end with init_suffix. If the number of such states is 1 (or 0), the function shortens the suffix (cuts the first token) in order to lower the requirements, and makes another try.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.stdweight-Tuple{Any,Any}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.stdweight",
    "category": "method",
    "text": "stdweight(state, token)\n\nA constant 1. Used as a placeholder function in Model to represent unbiased weight function.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.walker",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.walker",
    "category": "function",
    "text": "walker(model, init_state, init_accum, newstate=append_token)\n\nReturn an array of tokens obtained by a random walk through the Markov chain. The walk starts at state init_state and ends once a special token :end is reached. A function newstate of general type func(::State{T}, ::Token{T})::State{T} where T can be supplied to be used to generate a new state given the old state and the following token.\n\nThis is a general function which is used by all the walk functions.\n\nSee also: walk, walk2.\n\n\n\n\n\n"
},

{
    "location": "internals/#Module-MarkovChains-1",
    "page": "Interní symboly (EN)",
    "title": "Module MarkovChains",
    "category": "section",
    "text": "The following are the private symbols from the module MarkovChains. Most of the users shouldn\'t really need those.Modules = [MarkovChains]\nPublic = false\nOrder   = [:constant, :type, :function]"
},

{
    "location": "internals/#Tokenizer.to_words-Tuple{Array{#s16,1} where #s16<:AbstractString}",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.to_words",
    "category": "method",
    "text": "to_words(tokens::Vector{<:AbstractString}; keeppunctuation=true)\n\nSplit all of the tokens in tokens into individual words by whitespace. If keeppunctuation is true, all of the special characters are preserved (and thus \"glued\" to the preceding/following word).\n\n\n\n\n\n"
},

{
    "location": "internals/#Module-Tokenizer-1",
    "page": "Interní symboly (EN)",
    "title": "Module Tokenizer",
    "category": "section",
    "text": "The following are the private symbols from the module Tokenizer.Modules = [Tokenizer]\nPublic = false\nOrder   = [:constant, :type, :function]"
},

]}

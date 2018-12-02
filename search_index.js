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
    "text": "Balíček slouží k vytvoření Markovova řetězce daného řádu ze vstupního textu. Pomocí tohoto modelu je poté možné generovat náhodný text, který sdílí s původním textem určité vlastnosti (konkrétně popsáno v oddílu Popis funkce).Protože Markovovy řetězce umí tento balíček stavět pouze z textu rozděleného na části, takzvané tokeny, poskytuje současně kromě Markovových řetězců i několik základních funkcí, pomocí kterých je možno jakýkoli text na vhodné tokeny rozdělit. Kromě toho je rovnou při rozdělování možno vstupní text zbavit nežádoucích znaků (viz dokumentace modulu Tokenizer v oddílu Public Documentation). Další funkce na rozdělování textu, stejně jako funkce na čištění vstupu, si může uživatel jednoduše nadefinovat sám a říct funkcím modulu Tokenizer, ať pracují s nimi místo s funkcemi výchozími. Poskytované funkce by nicméně měly stačit na většinu běžných vstupů.Jakmile je text rozdělený na tokeny, je možné z něj vytvořit model. Model je nepřesnou reprezentací Markovova řetězce přizpůsobeného ke generování náhodného textu (viz oddíl Popis funkce). Balíček poskytuje několik funkcí, které umí na základě modelu vygenerovat text, který má podobné charakteristiky jako text původní. Kvalita modelu závisí na jeho řádu, při vyšším řádu je ovšem nutné dodat větší množství trénovacího textu, jinak má generovaný text tendenci ztrácet svůj náhodný charakter."
},

{
    "location": "function/#",
    "page": "Popis funkce",
    "title": "Popis funkce",
    "category": "page",
    "text": ""
},

{
    "location": "function/#Popis-funkce-1",
    "page": "Popis funkce",
    "title": "Popis funkce",
    "category": "section",
    "text": "note: Poznámka\nTento text pojednává o obecném principu stojícímu za Markovovými řetězci a generováním textu z nich. Naopak implementaci tohoto obecného principu se věnuje oddíl Popis implementace."
},

{
    "location": "function/#Markovův-řetězec-1",
    "page": "Popis funkce",
    "title": "Markovův řetězec",
    "category": "section",
    "text": "Stacionární Markovův řetězec (dále Markovův řetězec) je uspořádaná posloupnost n náhodných proměnných X_1 X_2 ldots X_n.[1] Ty mohou nabývat jedné z konečné množiny hodnot; hodnotu náhodné proměnné X_i budeme značit x_i a nazveme ji stav v okamžiku i. Množinu všech možných stavů označíme jako stavový prostor. Pro všechny X_i (i1) platí, že:PleftX_i = x vert X_1=x_1 X_2=x_2 ldots X_i-1 = x_i-1right = PleftX_i = x vert X_i-1 = x_i-1rightJinými slovy, stav v okamžiku i závisí pouze na stavu v předchozím okamžiku.Tato takzvaná markovovská vlastnost dala Markovově řetězci jeho jméno. Dovoluje nám znázornit celý systém orientovaným grafem, ve kterém vrcholy představují jednotlivé stavy systému a hrany mají hodnoty pravděpodobností přechodů z jednoho stavu do druhého.tip: Příklad\nMějme pravděpodobnostní systém, který popisuje vývoj počasí pomocí dvou stavů: zataženo (E) a jasno (A). Řekněme, že se snažíme zjistit, z jakou pravděpodobností bude zítra zataženo.Pokud bychom se snažili namodelovat tento systém bez jakékoli znalosti dnešního počasí, museli bychom si o druhu zítřejšího počasí prostě hodit mincí: nemáme totiž jiný způsob, jak lépe odhadnout, jak zítra bude.Pokud využijeme znalost toho, jak je dnes, můžeme k namodelování stavu počasí použít Markovův řetezec. Víme totiž, že pokud je jeden den zataženo, je šance 70%, že další den už bude jasno. Je-li jasno, s pravděpodobností 60% bude další den také jasno (bydlíme v Kalifornii). Takový Markovův řetezec by se dal grafem znázornit takto (zdroj: Wikipedie):(Image: Znázornění Markovova řetězce grafem)Pro úplnost dodáváme, že Markovův řetězec se dá kromě grafu popsat také maticí pravděpodobností přechodu P, kde p_ij označuje pravděpodobnost přechodu v okamžiku n ze stavu i do stavu j.Pojem Markovův řetězec se dá dále rozšířit o takzvaný řád (anglicky order). Stav v okamžiku i v Markovově řetězci o řádu r závisí na všech stavech X_i-1 X_i-2 ldots X_i-r."
},

{
    "location": "function/#Generování-textu-1",
    "page": "Popis funkce",
    "title": "Generování textu",
    "category": "section",
    "text": "Proces generování textu pomocí Markovova řetězce se skládá ze dvou částí:Vytvoření samotného řetězce na základě vstupního textu.\nProcházení vytvořeným grafem a postupné tvoření výstupu."
},

{
    "location": "function/#Vytvoření-grafu-1",
    "page": "Popis funkce",
    "title": "Vytvoření grafu",
    "category": "section",
    "text": "Text se zpravidla modeluje řetězci o řádu 2, 3, nebo 4; obecně k. Stavový prostor bude tvořen všemi k-ticemi znaků, které se vyskytují ve vstupním textu: to budou vrcholy požadovaného grafu. Vyplatí se také nějak označit začátek a konec textu, třeba jako speciální stavy.Hrany (a jejich hodnoty) pak budou udávat, s jakou pravděpodobností se vyskytuje jedna k-tice znaků \"za\" jinou. Slovo \"za\" je v uvozovkách, neboť k-tice se překrývají a dvě následné k-tice se tedy liší pouze v jednom znaku.tip: Příklad\nMějme vstupní text \"ABABD\". Markovův řetězec o řádu 2 tohoto textu by se dal grafem znázornit takto:(Image: Znázornění druhého Markovova řetězce grafem)"
},

{
    "location": "function/#Procházení-grafu-1",
    "page": "Popis funkce",
    "title": "Procházení grafu",
    "category": "section",
    "text": "Pokud máme k dispozici graf, je generování textu už velice jednoduché: začneme na jednom z vrcholů označených jako začátek a pak se pohybujeme po hranách, dokud nenarazíme na vrchol konec. Po hranách se pohybujeme náhodně, přičemž hrany svými hodnotami ovlivňují rozložení pravděpodobností přesunu z jednoho stavu do druhého.tip: Příklad\nPokud použijeme graf z minulého příkladu, generování textu by mohlo probíhat například takto:začátek longrightarrow AB longrightarrow BA longrightarrow AB longrightarrow BA longrightarrow AB longrightarrow BD longrightarrow konecVýsledný text poté nebude prostým složením projitých stavů (neboť ty částečně překrývaly), ale bude vypdat takto: \"ABABABD\".[1]: Existují také řetězce nestacionární, kterým se rozložení pravděpodobností mění ještě v závislosti na okamžiku i. Ty ale nejsou předmětem našeho zájmu, neboť slouží k modelování dynamičtějších systémů než je text."
},

{
    "location": "implementation/#",
    "page": "Popis implementace",
    "title": "Popis implementace",
    "category": "page",
    "text": ""
},

{
    "location": "implementation/#Popis-implementace-1",
    "page": "Popis implementace",
    "title": "Popis implementace",
    "category": "section",
    "text": "note: Poznámka\nTento text pojednává o obecném principu za Markovovými řetězci. Naopak implementaci tohoto obecného principu se věnuje oddíl Popis implementace."
},

{
    "location": "implementation/#Markovovy-řetězce-1",
    "page": "Popis implementace",
    "title": "Markovovy řetězce",
    "category": "section",
    "text": ""
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
    "text": "The following symbols are exported from the MarkovChain module.Modules = [MarkovChains]\nPrivate = false\nOrder   = [:type, :function]The following symbols are exported from the Tokenizer module.Modules = [Tokenizer]\nPrivate = false\nOrder   = [:type, :function]"
},

{
    "location": "internals/#",
    "page": "Interní symboly (EN)",
    "title": "Interní symboly (EN)",
    "category": "page",
    "text": ""
},

{
    "location": "internals/#MarkovChains.build-Tuple{Array{Array{Any,1},1}}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.build",
    "category": "method",
    "text": "build(suptokens::Vector{Vector{Token{T}}}; order=2, weight=stdweight)\n\nTrains a Markov chain on an array of arrays of tokens (suptokens). Optionally an order of the chain can be supplied, that is the number of tokens in one state. A weight function of general type func(s::State{T}, t::Token{T})::Int can be supplied to be used to bias the weights based on the state or token.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.combine-Tuple{MarkovChains.Model,Vararg{MarkovChains.Model,N} where N}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.combine",
    "category": "method",
    "text": "function combine(chain::Model, others::Model...)\n\nReturn a Model which is a combination of all of the models provided. All of the arguments should have the same order. The nodes of all the Models are merged using the function merge.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.state_with_beginning-Union{Tuple{T}, Tuple{Model{T},Array{Union{Symbol, T},1}}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.state_with_beginning",
    "category": "method",
    "text": "state_with_beginning(model::Model{T}, tokens::Vector{Token{T}}; strict=false) where T\n\nAttempts to return a random valid state of model that begins with tokens. If strict is false and the model doesn\'t have any state that begins with tokens, the function shortens the tokens (cuts the last token) to lower the requirements and tries to find some valid state again.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.walk-Tuple{MarkovChains.Model{Any}}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.walk",
    "category": "method",
    "text": "walk(model::Model)\n\nReturn an array of tokens obtained by a random walk through the Markov chain. The walk starts at state [:begin, :begin...] (the length depends on the order of the supplied model) and ends once a special token :end is reached.\n\nSee also: walk2.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.walk-Union{Tuple{T}, Tuple{Model{T},Array{Union{Symbol, T},1}}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.walk",
    "category": "method",
    "text": "walk(model::Model{T}[, init_state::State{T}]) where T\n\nReturn an array of tokens obtained by a random walk through the Markov chain. The walk starts at state init_state and ends once a special token :end is reached.\n\nSee also: walk2.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.walk2-Tuple{MarkovChains.Model{Any}}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.walk2",
    "category": "method",
    "text": "walk2(model::Model{Any})\n\nReturn an array of tokens obtained by a random walk through the Markov chain. When there is only one state following the current one (i.e. there is 100% chance that the state will become the next one), the function shortens the current State as to lower the requirements and obtain more randomness. The State gets shortened until a state with at least two possible successors is found (or until State is only one token long).\n\nThe walk starts at state [:begin, :begin...] (the length depends on the order of the supplied model) and ends once a special token :end is reached.\n\nSee also: walk.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.walk2-Union{Tuple{T}, Tuple{Model{T},Array{Union{Symbol, T},1}}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.walk2",
    "category": "method",
    "text": "walk2(model::Model{T}[, init_state::State{T}]) where T\n\nReturn an array of tokens obtained by a random walk through the Markov chain. When there is only one state following the current one (i.e. there is 100% chance that the state will become the next one), the function shortens the current State as to lower the requirements and obtain more randomness. The State gets shortened until a state with at least two possible successors is found (or until State is only one token long).\n\nThe walk starts at state init_state and ends once a special token :end is reached.\n\nSee also: walk.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.Model",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.Model",
    "category": "type",
    "text": "The datastructure of the Markov chain. Encodes all the different states and the probabilities of going from one to another as a dictionary. The keys are the states, the values are the respective TokenOccurences dictionaries. Those are dictionaries which say how many times was a token found immediately after the state.\n\nFields\n\norder is the number of tokens the State\nnodes is a dictionary pairing State and its respective\n\nTokenOccurences dictionary.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.State",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.State",
    "category": "type",
    "text": "State{T} = Vector{Token{T}}\n\nA state is a succession of tokens.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.TokenOccurences",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.TokenOccurences",
    "category": "type",
    "text": "TokenOccurences{Token} = Dict{Union{Token, Symbol}, Int}\n\nA dictionary pairing tokens (or special symbols :begin and :end) with the number of their respective occurences.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.append_token-Union{Tuple{T}, Tuple{Array{Union{Symbol, T},1},Union{Symbol, T}}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.append_token",
    "category": "method",
    "text": "append_token(state::State{T}, token::Token{T}) where T\n\nDrop the first element in state and append the token at the end of the state array.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.begseq-Tuple{Any}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.begseq",
    "category": "method",
    "text": "begseq(n)\n\nReturn the symbol :begin repeated n times. This array is then used as a starting sequence for all suptokens.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.indexof-Union{Tuple{T}, Tuple{AbstractArray{T,1},T}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.indexof",
    "category": "method",
    "text": "indexof(array::AbstractVector{T}, n::T) where T\n\nGiven a sorted array, return the index on which n would be inserted in should the insertion preserve the sorting.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.next_token-Union{Tuple{T}, Tuple{Model{T},Array{Union{Symbol, T},1}}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.next_token",
    "category": "method",
    "text": "next_token(model::Model{T}, state::State{T}) where T\n\nReturn a token which will come after the current state, at random. The probabilities of individual tokens getting choosed are skewed by their individual values in the TokenOccurences dictionary of the current state, that is obtained from the model.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.randkey-Tuple{AbstractDict{Any,Number}}",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.randkey",
    "category": "method",
    "text": "randkey(dict::AbstractDict{Any, Number})\n\nReturn a random key from dict. The probabilities of individual keys getting chosen are skewed by their respective values.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.states_with_suffix-Union{Tuple{T}, Tuple{Model{T},Array{T,1}}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.states_with_suffix",
    "category": "method",
    "text": "states_with_suffix(model::Model{T}, init_suffix::Vector{Tokens{T}}) where T\n\nReturn all of the states of model that end with init_suffix. If the number of such states is 1 (or 0), the function shortens the suffix (cuts the first token) in order to lower the requirements, and makes another try.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.stdweight-Union{Tuple{T}, Tuple{Array{Union{Symbol, T},1},Union{Symbol, T}}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.stdweight",
    "category": "method",
    "text": "stdweight(state::State{T}, token::Token{T}) where T\n\nA constant 1. Used as a placeholder function in build to represent unbiased weight function.\n\n\n\n\n\n"
},

{
    "location": "internals/#MarkovChains.walker-Union{Tuple{T}, Tuple{Model{T},Array{Union{Symbol, T},1},Any}, Tuple{Model{T},Array{Union{Symbol, T},1},Any,Any}} where T",
    "page": "Interní symboly (EN)",
    "title": "MarkovChains.walker",
    "category": "method",
    "text": "walker(model::Model{T}, init_state::State{T}, init_accum, newstate=append_token) where T\n\nReturn an array of tokens obtained by a random walk through the Markov chain. The walk starts at state init_state and ends once a special token :end is reached. A function newstate of general type func(state::State{T}, token::Token{T})::State{T} where T can be supplied to be used to generate a new state given the old state and the following token.\n\nThis is a general function which is used by all the walk functions.\n\nSee also: walk, walk2.\n\n\n\n\n\n"
},

{
    "location": "internals/#Tokenizer.cleanup-Tuple{Array{Array{String,1},1}}",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.cleanup",
    "category": "method",
    "text": "cleanup(suptokens::Vector{Vector{String}}; badchars=\"\n\n-_()[]{}<>–—$=\'\"„“ 	\")\n\nRemove all characters that are in badchars from all tokens in suptokens.\n\n\n\n\n\n"
},

{
    "location": "internals/#Tokenizer.letters",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.letters",
    "category": "function",
    "text": "letters = cleanup ∘ to_letters ∘ to_sentences\n\nComposite function which splits its input into sentences, then the sentences into letters, and then removes special characters.\n\n\n\n\n\n"
},

{
    "location": "internals/#Tokenizer.lines",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.lines",
    "category": "function",
    "text": "lines = cleanup ∘ to_letters ∘ to_sentences\n\nComposite function which splits its input into lines, then the line into letters, and then removes special characters.\n\n\n\n\n\n"
},

{
    "location": "internals/#Tokenizer.to_letters-Tuple{Array{String,1}}",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.to_letters",
    "category": "method",
    "text": "to_letters(tokens::Vector{String})\n\nSplit all of the tokens in tokens into individual characters.\n\n\n\n\n\n"
},

{
    "location": "internals/#Tokenizer.to_lines-Tuple{Any}",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.to_lines",
    "category": "method",
    "text": "to_lines(text)\n\nReturn an array of lines in text.\n\n\n\n\n\n"
},

{
    "location": "internals/#Tokenizer.to_sentences-Tuple{Any}",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.to_sentences",
    "category": "method",
    "text": "to_sentences(text)\n\nReturn an array of sentences in text. The text is split along dots; the dots remain in the strings, only the spaces after the dots are stripped.\n\nThe function tries to be as smart as possible. For example, the string \"Channel No. 5 is a perfume.\" will be treated as one sentence, although it has two dots.\n\n\n\n\n\n"
},

{
    "location": "internals/#Tokenizer.tokenize",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.tokenize",
    "category": "function",
    "text": "tokenize(inp[, func=letters])\n\nSplit the text into SupTokens (list of lists of tokens). An optional function of general type func(inp:T1)::Vector{Vector{T2}} can be provided to be used for the tokenization.\n\nFor possible combinators which can be composed to obtain func, see: to_lines, to_sentences, to_letters, to_words, cleanup.\n\n\n\n\n\n"
},

{
    "location": "internals/#Tokenizer.words",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.words",
    "category": "function",
    "text": "words = cleanup ∘ to_letters ∘ to_sentences\n\nComposite function which splits its input into sentences, then the sentences into words, and then removes special characters. Please note that dots and commas are not removed.\n\n\n\n\n\n"
},

{
    "location": "internals/#Tokenizer.to_words-Tuple{Array{String,1}}",
    "page": "Interní symboly (EN)",
    "title": "Tokenizer.to_words",
    "category": "method",
    "text": "to_words(tokens::Vector{String}; keeppunctuation=true)\n\nSplit all of the tokens in tokens into individual words by whitespace. If keeppunctuation is true, all of the special characters are preserved (and thus \"glued\" to the preceding/following word).\n\n\n\n\n\n"
},

{
    "location": "internals/#Internal-Documentation-1",
    "page": "Interní symboly (EN)",
    "title": "Internal Documentation",
    "category": "section",
    "text": "The following are the private symbols from the module MarkdownChains.Modules = [MarkovChains]\nPrivate = true\nOrder   = [:type, :function]The following are the private symbols from the module Tokenizer.Modules = [Tokenizer]\nPrivate = true\nOrder   = [:type, :function]"
},

]}

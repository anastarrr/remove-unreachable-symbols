window.onload = () => {
    const apply = document.getElementById("apply")
    const ex1 = document.getElementById("ex1")
    const ex2 = document.getElementById("ex2")
    const ex3 = document.getElementById("ex3")
    apply.onclick = applyAlgorithm
    ex1.onclick = example1
    ex2.onclick = example2
    ex3.onclick = example3
}
function applyAlgorithm() {
    clearContainers(['unreachable', 'unreachable-res'])
    const rawProds = readProds()
    const prods = parseProds(rawProds)
    const prodsWithoutUnreachable = deleteUnreachableSymbols(prods)
    printProds(prodsWithoutUnreachable, 'unreachable-res', 1)
}

function clearContainers(ids) {
    ids.forEach((id) => {
        const parent = document.getElementById(id)
        parent.innerHTML = ''
    })
}

function printProds(prods, id, s) {
    const parent = document.getElementById(id)
    const span = document.createElement('span')
    span.innerHTML = `P${s === 1 ? '\'' : '\'\''}:`
    parent.appendChild(span)
    Object.entries(prods).forEach(([nonterm, transitions]) => {
        let trans = ''
        transitions.forEach((i, ind) => {
            trans += i
            if (ind + 1 < transitions.length) trans += ' | '
        })
        let str = `${nonterm} → ${trans}`
        const div = document.createElement('div')
        div.innerHTML = str
        parent.appendChild(div)
    })
}

function printSet(y, ind, id) {
    const a = Array.from(y)
    let str = `y<sub>${ind}</sub> = `
    if (a.length === 0) str += 'ø'
    else {
        str += '{'
        a.forEach((i, index) => {
            str += (index + 1 < a.length) ? `${i}, ` : `${i}}`
        })
    }
    const div = document.createElement('div')
    div.innerHTML = str
    const parent = document.getElementById(id)
    parent.appendChild(div)
}

function deleteUnreachableSymbols(prods) {
    const y = new Set()
    y.add('S')
    let needIter = true
    let iters = 0
    printSet(y, iters, 'unreachable')
    while (needIter) {
        const oldSize = y.size
        const yArray = Array.from(y)
        yArray.forEach((n) => {
            if (isNonterminal(n)) {
                const transitions = prods[n]
                if (transitions) {
                    transitions.forEach((t) => {
                        const symbols = t.match(/\\?.|./g)
                        symbols.forEach((s) => {
                            y.add(s)
                        })
                    })
                }
            }
        })
        needIter = y.size > oldSize
        printSet(y, ++iters, 'unreachable')
    }
    const prodsWithoutUnreachable = Object.fromEntries(Object.entries(prods).filter(([nonterm]) => y.has(nonterm)))
    return prodsWithoutUnreachable
}

function isLetter(c) {
    return c.toLowerCase() !== c.toUpperCase();
}

function isNonterminal(c) {
    return c.toUpperCase() === c && isLetter(c)
}

function parseProds(rawProds) {
    const normalizedArray = normalizeProds(rawProds)
    const prods = {}
    normalizedArray.forEach((a) => {
        let [nonterm, transitions] = a.split('->')
        transitions = transitions.split('|')
        prods[nonterm] = transitions
    })
    return prods
}

function normalizeProds(rawProds) {
    let arrayString = rawProds.split('\n')
    arrayString = arrayString.map((a) => a.replaceAll(' ', ''))
    arrayString = arrayString.filter((a) => Boolean(a))
    return arrayString
}

function readProds() {
    const form = document.getElementById('input')
    return form.value
}

function example1() {
    const form = document.getElementById('input')
    form.value = `S -> Ab|Bb
A -> ab|+B|@C
B -> *C
C -> BA|Cb
D -> Acb|\\e`
}

function example2() {
    const form = document.getElementById('input')
    form.value = `S -> cE|AA
A -> EA|cc|a
B -> B|BaB|a
C -> bb|a|c
E -> a`
}

function example3() {
    const form = document.getElementById('input')
    form.value = `S -> A|01
A -> 1|000|\\e
B -> 01|1B0 
C -> D1|\\e
D -> A0|B1|1C`
}
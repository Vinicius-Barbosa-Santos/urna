let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let lateral = document.querySelector('.d-1-right')
let aviso = document.querySelector('.d-2')
let numeros = document.querySelector('.d-1-3')

let etapa = 0
let numero = ''
let votoBranco = false
let votos = []

function limparTela() {
    let etapaAtual = etapas[etapa]

    let numerosHTML = ''
    numero = ''
    votoBranco = false

    for(let i = 0; i < etapaAtual.numeros; i++) {
        if(i === 0) {
            numerosHTML += '<div class="numero pisca"></div>'
        } else {
            numerosHTML += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapaAtual.titulo
    descricao.innerHTML = ''
    lateral.innerHTML = ''
    aviso.style.display = 'none'
    numeros.innerHTML = numerosHTML
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca')
    if (elNumero != null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`
    }

    elNumero.classList.remove('pisca')
    if(elNumero.nextElementSibling != null) {
        elNumero.nextElementSibling.classList.add('pisca')
    } else {
        atualizaInterface()
    }
}

function atualizaInterface() {
    let etapaAtual = etapas[etapa]
    let candidatos = etapaAtual.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true
        } else {
            return false
        }
    })

    if(candidatos.length > 0) {
        let candidato = candidatos[0]
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = `Nome : ${candidato.nome}</br>Partido: ${candidato.partido}`
        aviso.style.display = 'block'

        let fotos = ''

        for (let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotos += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`
            } else {
                fotos += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotos
    } else {
        seuVotoPara.style.display = 'none'
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
        aviso.style.display = 'none'
    }
}

limparTela()

function branco() {
    numero = ''
    votoBranco = true
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    numeros.innerHTML = ''
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
    lateral.innerHTML = ''
}

function corrige() {
    limparTela()
}

function confirma() {
    let etapaAtual = etapas[etapa]

    let votoConfirmado = false

    if(votoBranco === true) {
        votoConfirmado = true
        votos.push({
            etapaAtual : etapas[etapa].titulo,
            voto: 'branco'
        })
    } else if(numero.length === etapaAtual.numeros) {
        votoConfirmado = true
        votos.push({
            etapaAtual : etapas[etapa].titulo,
            voto : numero
        })
    }

    if(votoConfirmado) {
        etapa++
        if(etapas[etapa] !== undefined) {
            limparTela()
        } else {
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM!</div>`
            console.log(votos)
        }
    }
}
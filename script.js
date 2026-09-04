// ============================================
// STORAGE & DATA MANAGEMENT
// ============================================

function initializeStorage() {
    if (!localStorage.getItem('licoes')) {
        localStorage.setItem('licoes', JSON.stringify([]));
    }
    if (!localStorage.getItem('trimestres')) {
        localStorage.setItem('trimestres', JSON.stringify([]));
    }
    if (!localStorage.getItem('versiculos')) {
        localStorage.setItem('versiculos', JSON.stringify([]));
    }
    if (!localStorage.getItem('perguntas')) {
        localStorage.setItem('perguntas', JSON.stringify([]));
    }
    if (!localStorage.getItem('arquivos')) {
        localStorage.setItem('arquivos', JSON.stringify([]));
    }
    if (!localStorage.getItem('avisos')) {
        localStorage.setItem('avisos', JSON.stringify([]));
    }
}

// ============================================
// NAVIGATION
// ============================================

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Load section data
    if (sectionId === 'licoes') {
        loadLicoes();
    } else if (sectionId === 'trimestres') {
        loadTrimestres();
    } else if (sectionId === 'versiculos') {
        loadVersiculos();
    } else if (sectionId === 'perguntas') {
        loadPerguntas();
    } else if (sectionId === 'arquivos') {
        loadArquivos();
    } else if (sectionId === 'avisos') {
        loadAvisos();
    }
}

// ============================================
// LIÇÕES
// ============================================

function openLicaoModal() {
    document.getElementById('licaoId').value = '';
    document.getElementById('licaoTitulo').value = '';
    document.getElementById('licaoReferencia').value = '';
    document.getElementById('licaoDescricao').value = '';
    document.getElementById('licaoData').value = '';
    document.getElementById('licaoModal').style.display = 'block';
}

function closeLicaoModal() {
    document.getElementById('licaoModal').style.display = 'none';
}

function salvarLicao(event) {
    event.preventDefault();
    
    try {
        const id = document.getElementById('licaoId').value || Date.now().toString();
        const titulo = document.getElementById('licaoTitulo').value;
        const referencia = document.getElementById('licaoReferencia').value;
        const descricao = document.getElementById('licaoDescricao').value;
        const data = document.getElementById('licaoData').value;
        
        let licoes = JSON.parse(localStorage.getItem('licoes') || '[]');
        const licaoExistente = licoes.findIndex(l => l.id === id);
        
        const licao = {
            id,
            titulo,
            referencia,
            descricao,
            data,
            dataCriacao: new Date().toLocaleDateString('pt-BR')
        };
        
        if (licaoExistente !== -1) {
            licoes[licaoExistente] = licao;
        } else {
            licoes.push(licao);
        }
        
        localStorage.setItem('licoes', JSON.stringify(licoes));
        alert('✅ Lição salva com sucesso!');
        closeLicaoModal();
        loadLicoes();
    } catch (error) {
        console.error('Erro ao salvar lição:', error);
        alert('❌ Erro ao salvar lição');
    }
}

function loadLicoes() {
    try {
        const licoes = JSON.parse(localStorage.getItem('licoes') || '[]');
        const licoesList = document.getElementById('licoesList');
        
        if (licoes.length === 0) {
            licoesList.innerHTML = '<p class="text-center">Nenhuma lição cadastrada</p>';
            return;
        }
        
        licoesList.innerHTML = licoes.map(licao => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>📚 ${licao.titulo}</h4>
                    <p><strong>Referência:</strong> ${licao.referencia}</p>
                    <p><strong>Data:</strong> ${licao.data}</p>
                    <p>${licao.descricao}</p>
                </div>
                <div class="list-item-actions">
                    <button onclick="editarLicao('${licao.id}')" class="btn btn-info">✏️ Editar</button>
                    <button onclick="deletarLicao('${licao.id}')" class="btn btn-danger">🗑️ Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar lições:', error);
    }
}

function editarLicao(id) {
    try {
        const licoes = JSON.parse(localStorage.getItem('licoes') || '[]');
        const licao = licoes.find(l => l.id === id);
        
        if (licao) {
            document.getElementById('licaoId').value = licao.id;
            document.getElementById('licaoTitulo').value = licao.titulo;
            document.getElementById('licaoReferencia').value = licao.referencia;
            document.getElementById('licaoDescricao').value = licao.descricao;
            document.getElementById('licaoData').value = licao.data;
            document.getElementById('licaoModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao editar lição:', error);
    }
}

function deletarLicao(id) {
    if (confirm('Tem certeza que deseja deletar esta lição?')) {
        try {
            let licoes = JSON.parse(localStorage.getItem('licoes') || '[]');
            licoes = licoes.filter(l => l.id !== id);
            localStorage.setItem('licoes', JSON.stringify(licoes));
            alert('✅ Lição deletada com sucesso!');
            loadLicoes();
        } catch (error) {
            console.error('Erro ao deletar lição:', error);
        }
    }
}

// ============================================
// TRIMESTRES
// ============================================

function openTrimestralModal() {
    document.getElementById('trimestralId').value = '';
    document.getElementById('trimestralTitulo').value = '';
    document.getElementById('trimestralTema').value = '';
    document.getElementById('trimestralDataInicio').value = '';
    document.getElementById('trimestralDataFim').value = '';
    document.getElementById('trimestralModal').style.display = 'block';
}

function closeTrimestralModal() {
    document.getElementById('trimestralModal').style.display = 'none';
}

function salvarTrimestral(event) {
    event.preventDefault();
    
    try {
        const id = document.getElementById('trimestralId').value || Date.now().toString();
        const titulo = document.getElementById('trimestralTitulo').value;
        const tema = document.getElementById('trimestralTema').value;
        const dataInicio = document.getElementById('trimestralDataInicio').value;
        const dataFim = document.getElementById('trimestralDataFim').value;
        
        let trimestres = JSON.parse(localStorage.getItem('trimestres') || '[]');
        const trimestralExistente = trimestres.findIndex(t => t.id === id);
        
        const trimestral = {
            id,
            titulo,
            tema,
            dataInicio,
            dataFim,
            dataCriacao: new Date().toLocaleDateString('pt-BR')
        };
        
        if (trimestralExistente !== -1) {
            trimestres[trimestralExistente] = trimestral;
        } else {
            trimestres.push(trimestral);
        }
        
        localStorage.setItem('trimestres', JSON.stringify(trimestres));
        alert('✅ Trimestre salvo com sucesso!');
        closeTrimestralModal();
        loadTrimestres();
    } catch (error) {
        console.error('Erro ao salvar trimestre:', error);
        alert('❌ Erro ao salvar trimestre');
    }
}

function loadTrimestres() {
    try {
        const trimestres = JSON.parse(localStorage.getItem('trimestres') || '[]');
        const trimestralList = document.getElementById('trimestralList');
        
        if (trimestres.length === 0) {
            trimestralList.innerHTML = '<p class="text-center">Nenhum trimestre cadastrado</p>';
            return;
        }
        
        trimestralList.innerHTML = trimestres.map(trimestral => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>📅 ${trimestral.titulo}</h4>
                    <p><strong>Tema:</strong> ${trimestral.tema}</p>
                    <p><strong>Período:</strong> ${trimestral.dataInicio} até ${trimestral.dataFim}</p>
                </div>
                <div class="list-item-actions">
                    <button onclick="editarTrimestral('${trimestral.id}')" class="btn btn-info">✏️ Editar</button>
                    <button onclick="deletarTrimestral('${trimestral.id}')" class="btn btn-danger">🗑️ Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar trimestres:', error);
    }
}

function editarTrimestral(id) {
    try {
        const trimestres = JSON.parse(localStorage.getItem('trimestres') || '[]');
        const trimestral = trimestres.find(t => t.id === id);
        
        if (trimestral) {
            document.getElementById('trimestralId').value = trimestral.id;
            document.getElementById('trimestralTitulo').value = trimestral.titulo;
            document.getElementById('trimestralTema').value = trimestral.tema;
            document.getElementById('trimestralDataInicio').value = trimestral.dataInicio;
            document.getElementById('trimestralDataFim').value = trimestral.dataFim;
            document.getElementById('trimestralModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao editar trimestre:', error);
    }
}

function deletarTrimestral(id) {
    if (confirm('Tem certeza que deseja deletar este trimestre?')) {
        try {
            let trimestres = JSON.parse(localStorage.getItem('trimestres') || '[]');
            trimestres = trimestres.filter(t => t.id !== id);
            localStorage.setItem('trimestres', JSON.stringify(trimestres));
            alert('✅ Trimestre deletado com sucesso!');
            loadTrimestres();
        } catch (error) {
            console.error('Erro ao deletar trimestre:', error);
        }
    }
}

// ============================================
// VERSÍCULOS
// ============================================

function openVersiculoModal() {
    document.getElementById('versiculoId').value = '';
    document.getElementById('versiculoReferencia').value = '';
    document.getElementById('versiculoTexto').value = '';
    document.getElementById('versiculoCategoria').value = '';
    document.getElementById('versiculoModal').style.display = 'block';
}

function closeVersiculoModal() {
    document.getElementById('versiculoModal').style.display = 'none';
}

function salvarVersiculo(event) {
    event.preventDefault();
    
    try {
        const id = document.getElementById('versiculoId').value || Date.now().toString();
        const referencia = document.getElementById('versiculoReferencia').value;
        const texto = document.getElementById('versiculoTexto').value;
        const categoria = document.getElementById('versiculoCategoria').value;
        
        let versiculos = JSON.parse(localStorage.getItem('versiculos') || '[]');
        const versiculoExistente = versiculos.findIndex(v => v.id === id);
        
        const versiculo = {
            id,
            referencia,
            texto,
            categoria,
            dataCriacao: new Date().toLocaleDateString('pt-BR')
        };
        
        if (versiculoExistente !== -1) {
            versiculos[versiculoExistente] = versiculo;
        } else {
            versiculos.push(versiculo);
        }
        
        localStorage.setItem('versiculos', JSON.stringify(versiculos));
        alert('✅ Versículo salvo com sucesso!');
        closeVersiculoModal();
        loadVersiculos();
    } catch (error) {
        console.error('Erro ao salvar versículo:', error);
        alert('❌ Erro ao salvar versículo');
    }
}

function loadVersiculos() {
    try {
        const versiculos = JSON.parse(localStorage.getItem('versiculos') || '[]');
        const versiculosList = document.getElementById('versiculosList');
        
        if (versiculos.length === 0) {
            versiculosList.innerHTML = '<p class="text-center">Nenhum versículo cadastrado</p>';
            return;
        }
        
        versiculosList.innerHTML = versiculos.map(versiculo => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>📖 ${versiculo.referencia}</h4>
                    <p>${versiculo.texto}</p>
                    <p><strong>Categoria:</strong> ${versiculo.categoria}</p>
                </div>
                <div class="list-item-actions">
                    <button onclick="editarVersiculo('${versiculo.id}')" class="btn btn-info">✏️ Editar</button>
                    <button onclick="deletarVersiculo('${versiculo.id}')" class="btn btn-danger">🗑️ Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar versículos:', error);
    }
}

function editarVersiculo(id) {
    try {
        const versiculos = JSON.parse(localStorage.getItem('versiculos') || '[]');
        const versiculo = versiculos.find(v => v.id === id);
        
        if (versiculo) {
            document.getElementById('versiculoId').value = versiculo.id;
            document.getElementById('versiculoReferencia').value = versiculo.referencia;
            document.getElementById('versiculoTexto').value = versiculo.texto;
            document.getElementById('versiculoCategoria').value = versiculo.categoria;
            document.getElementById('versiculoModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao editar versículo:', error);
    }
}

function deletarVersiculo(id) {
    if (confirm('Tem certeza que deseja deletar este versículo?')) {
        try {
            let versiculos = JSON.parse(localStorage.getItem('versiculos') || '[]');
            versiculos = versiculos.filter(v => v.id !== id);
            localStorage.setItem('versiculos', JSON.stringify(versiculos));
            alert('✅ Versículo deletado com sucesso!');
            loadVersiculos();
        } catch (error) {
            console.error('Erro ao deletar versículo:', error);
        }
    }
}

// ============================================
// PERGUNTAS
// ============================================

function openPerguntaModal() {
    document.getElementById('perguntaId').value = '';
    document.getElementById('perguntaTexto').value = '';
    document.getElementById('perguntaResposta').value = '';
    document.getElementById('perguntaLicao').value = '';
    document.getElementById('perguntaModal').style.display = 'block';
}

function closePerguntaModal() {
    document.getElementById('perguntaModal').style.display = 'none';
}

function salvarPergunta(event) {
    event.preventDefault();
    
    try {
        const id = document.getElementById('perguntaId').value || Date.now().toString();
        const texto = document.getElementById('perguntaTexto').value;
        const resposta = document.getElementById('perguntaResposta').value;
        const licao = document.getElementById('perguntaLicao').value;
        
        let perguntas = JSON.parse(localStorage.getItem('perguntas') || '[]');
        const perguntaExistente = perguntas.findIndex(p => p.id === id);
        
        const pergunta = {
            id,
            texto,
            resposta,
            licao,
            dataCriacao: new Date().toLocaleDateString('pt-BR')
        };
        
        if (perguntaExistente !== -1) {
            perguntas[perguntaExistente] = pergunta;
        } else {
            perguntas.push(pergunta);
        }
        
        localStorage.setItem('perguntas', JSON.stringify(perguntas));
        alert('✅ Pergunta salva com sucesso!');
        closePerguntaModal();
        loadPerguntas();
    } catch (error) {
        console.error('Erro ao salvar pergunta:', error);
        alert('❌ Erro ao salvar pergunta');
    }
}

function loadPerguntas() {
    try {
        const perguntas = JSON.parse(localStorage.getItem('perguntas') || '[]');
        const perguntasList = document.getElementById('perguntasList');
        
        if (perguntas.length === 0) {
            perguntasList.innerHTML = '<p class="text-center">Nenhuma pergunta cadastrada</p>';
            return;
        }
        
        perguntasList.innerHTML = perguntas.map(pergunta => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>📝 ${pergunta.texto}</h4>
                    <p><strong>Resposta:</strong> ${pergunta.resposta}</p>
                    <p><strong>Lição:</strong> ${pergunta.licao || 'N/A'}</p>
                </div>
                <div class="list-item-actions">
                    <button onclick="editarPergunta('${pergunta.id}')" class="btn btn-info">✏️ Editar</button>
                    <button onclick="deletarPergunta('${pergunta.id}')" class="btn btn-danger">🗑️ Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
    }
}

function editarPergunta(id) {
    try {
        const perguntas = JSON.parse(localStorage.getItem('perguntas') || '[]');
        const pergunta = perguntas.find(p => p.id === id);
        
        if (pergunta) {
            document.getElementById('perguntaId').value = pergunta.id;
            document.getElementById('perguntaTexto').value = pergunta.texto;
            document.getElementById('perguntaResposta').value = pergunta.resposta;
            document.getElementById('perguntaLicao').value = pergunta.licao;
            document.getElementById('perguntaModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao editar pergunta:', error);
    }
}

function deletarPergunta(id) {
    if (confirm('Tem certeza que deseja deletar esta pergunta?')) {
        try {
            let perguntas = JSON.parse(localStorage.getItem('perguntas') || '[]');
            perguntas = perguntas.filter(p => p.id !== id);
            localStorage.setItem('perguntas', JSON.stringify(perguntas));
            alert('✅ Pergunta deletada com sucesso!');
            loadPerguntas();
        } catch (error) {
            console.error('Erro ao deletar pergunta:', error);
        }
    }
}

// ============================================
// ARQUIVOS
// ============================================

function openArquivoModal() {
    document.getElementById('arquivoId').value = '';
    document.getElementById('arquivoNome').value = '';
    document.getElementById('arquivoURL').value = '';
    document.getElementById('arquivoTipo').value = '';
    document.getElementById('arquivoDescricao').value = '';
    document.getElementById('arquivoModal').style.display = 'block';
}

function closeArquivoModal() {
    document.getElementById('arquivoModal').style.display = 'none';
}

function salvarArquivo(event) {
    event.preventDefault();
    
    try {
        const id = document.getElementById('arquivoId').value || Date.now().toString();
        const nome = document.getElementById('arquivoNome').value;
        const url = document.getElementById('arquivoURL').value;
        const tipo = document.getElementById('arquivoTipo').value;
        const descricao = document.getElementById('arquivoDescricao').value;
        
        let arquivos = JSON.parse(localStorage.getItem('arquivos') || '[]');
        const arquivoExistente = arquivos.findIndex(a => a.id === id);
        
        const arquivo = {
            id,
            nome,
            url,
            tipo,
            descricao,
            dataCriacao: new Date().toLocaleDateString('pt-BR')
        };
        
        if (arquivoExistente !== -1) {
            arquivos[arquivoExistente] = arquivo;
        } else {
            arquivos.push(arquivo);
        }
        
        localStorage.setItem('arquivos', JSON.stringify(arquivos));
        alert('✅ Arquivo salvo com sucesso!');
        closeArquivoModal();
        loadArquivos();
    } catch (error) {
        console.error('Erro ao salvar arquivo:', error);
        alert('❌ Erro ao salvar arquivo');
    }
}

function loadArquivos() {
    try {
        const arquivos = JSON.parse(localStorage.getItem('arquivos') || '[]');
        const arquivosList = document.getElementById('arquivosList');
        
        if (arquivos.length === 0) {
            arquivosList.innerHTML = '<p class="text-center">Nenhum arquivo cadastrado</p>';
            return;
        }
        
        arquivosList.innerHTML = arquivos.map(arquivo => `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>📁 ${arquivo.nome}</h4>
                    <p><strong>Tipo:</strong> ${arquivo.tipo}</p>
                    <p>${arquivo.descricao}</p>
                </div>
                <div class="list-item-actions">
                    <a href="${arquivo.url}" target="_blank" class="btn btn-info">🔗 Abrir</a>
                    <button onclick="editarArquivo('${arquivo.id}')" class="btn btn-info">✏️ Editar</button>
                    <button onclick="deletarArquivo('${arquivo.id}')" class="btn btn-danger">🗑️ Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Erro ao carregar arquivos:', error);
    }
}

function editarArquivo(id) {
    try {
        const arquivos = JSON.parse(localStorage.getItem('arquivos') || '[]');
        const arquivo = arquivos.find(a => a.id === id);
        
        if (arquivo) {
            document.getElementById('arquivoId').value = arquivo.id;
            document.getElementById('arquivoNome').value = arquivo.nome;
            document.getElementById('arquivoURL').value = arquivo.url;
            document.getElementById('arquivoTipo').value = arquivo.tipo;
            document.getElementById('arquivoDescricao').value = arquivo.descricao;
            document.getElementById('arquivoModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao editar arquivo:', error);
    }
}

function deletarArquivo(id) {
    if (confirm('Tem certeza que deseja deletar este arquivo?')) {
        try {
            let arquivos = JSON.parse(localStorage.getItem('arquivos') || '[]');
            arquivos = arquivos.filter(a => a.id !== id);
            localStorage.setItem('arquivos', JSON.stringify(arquivos));
            alert('✅ Arquivo deletado com sucesso!');
            loadArquivos();
        } catch (error) {
            console.error('Erro ao deletar arquivo:', error);
        }
    }
}

// ============================================
// AVISOS
// ============================================

function openAvisoModal() {
    document.getElementById('avisoId').value = '';
    document.getElementById('avisoTitulo').value = '';
    document.getElementById('avisoMensagem').value = '';
    document.getElementById('avisoUrgencia').value = 'Média';
    document.getElementById('avisoData').value = new Date().toISOString().split('T')[0];
    document.getElementById('avisoModal').style.display = 'block';
}

function closeAvisoModal() {
    document.getElementById('avisoModal').style.display = 'none';
}

function salvarAviso(event) {
    event.preventDefault();
    
    try {
        const id = document.getElementById('avisoId').value || Date.now().toString();
        const titulo = document.getElementById('avisoTitulo').value;
        const mensagem = document.getElementById('avisoMensagem').value;
        const urgencia = document.getElementById('avisoUrgencia').value;
        const data = document.getElementById('avisoData').value;
        
        let avisos = JSON.parse(localStorage.getItem('avisos') || '[]');
        const avisoExistente = avisos.findIndex(av => av.id === id);
        
        const aviso = {
            id,
            titulo,
            mensagem,
            urgencia,
            data,
            dataCriacao: new Date().toLocaleDateString('pt-BR')
        };
        
        if (avisoExistente !== -1) {
            avisos[avisoExistente] = aviso;
        } else {
            avisos.push(aviso);
        }
        
        localStorage.setItem('avisos', JSON.stringify(avisos));
        alert('✅ Aviso salvo com sucesso!');
        closeAvisoModal();
        loadAvisos();
    } catch (error) {
        console.error('Erro ao salvar aviso:', error);
        alert('❌ Erro ao salvar aviso');
    }
}

function loadAvisos() {
    try {
        const avisos = JSON.parse(localStorage.getItem('avisos') || '[]');
        const avisosList = document.getElementById('avisosList');
        
        if (avisos.length === 0) {
            avisosList.innerHTML = '<p class="text-center">Nenhum aviso cadastrado</p>';
            return;
        }
        
        const avisosSorted = avisos.sort((a, b) => new Date(b.data) - new Date(a.data));
        
        avisosList.innerHTML = avisosSorted.map(aviso => {
            const urgenciaEmoji = aviso.urgencia === 'Alta' ? '🔴' : aviso.urgencia === 'Média' ? '🟡' : '🟢';
            return `
                <div class="list-item">
                    <div class="list-item-info">
                        <h4>📢 ${urgenciaEmoji} ${aviso.titulo}</h4>
                        <p>${aviso.mensagem}</p>
                        <p><strong>Data:</strong> ${aviso.data} | <strong>Urgência:</strong> ${aviso.urgencia}</p>
                    </div>
                    <div class="list-item-actions">
                        <button onclick="editarAviso('${aviso.id}')" class="btn btn-info">✏️ Editar</button>
                        <button onclick="deletarAviso('${aviso.id}')" class="btn btn-danger">🗑️ Deletar</button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Erro ao carregar avisos:', error);
    }
}

function editarAviso(id) {
    try {
        const avisos = JSON.parse(localStorage.getItem('avisos') || '[]');
        const aviso = avisos.find(av => av.id === id);
        
        if (aviso) {
            document.getElementById('avisoId').value = aviso.id;
            document.getElementById('avisoTitulo').value = aviso.titulo;
            document.getElementById('avisoMensagem').value = aviso.mensagem;
            document.getElementById('avisoUrgencia').value = aviso.urgencia;
            document.getElementById('avisoData').value = aviso.data;
            document.getElementById('avisoModal').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao editar aviso:', error);
    }
}

function deletarAviso(id) {
    if (confirm('Tem certeza que deseja deletar este aviso?')) {
        try {
            let avisos = JSON.parse(localStorage.getItem('avisos') || '[]');
            avisos = avisos.filter(av => av.id !== id);
            localStorage.setItem('avisos', JSON.stringify(avisos));
            alert('✅ Aviso deletado com sucesso!');
            loadAvisos();
        } catch (error) {
            console.error('Erro ao deletar aviso:', error);
        }
    }
}

// ============================================
// MODAL CONTROLS
// ============================================

window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeStorage();
    } catch (error) {
        console.error('Erro na inicialização:', error);
    }
});

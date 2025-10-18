(() => {
  class Aluno {
    constructor(nome, idade, curso, notaFinal) {
      this.nome = nome;
      this.idade = idade;
      this.curso = curso;
      this.notaFinal = notaFinal;
    }

    isAprovado() {
      return this.notaFinal >= 7;
    }

    toString() {
      return `${this.nome} — ${this.idade} anos — ${this.curso} — Nota: ${this.notaFinal}`;
    }
  }
  const alunos = []; 
  let indiceEditando = -1; 

  const form = document.getElementById('alunoForm');
  const inputNome = document.getElementById('nome');
  const inputIdade = document.getElementById('idade');
  const selectCurso = document.getElementById('curso');
  const inputNotaFinal = document.getElementById('notaFinal');

  const btnCadastrar = document.getElementById('btnCadastrar');
  const btnAtualizar = document.getElementById('btnAtualizar');

  const tabelaBody = document.querySelector('#tabelaAlunos tbody');

  const btnAprovados = document.getElementById('btnAprovados');
  const btnMediaNotas = document.getElementById('btnMediaNotas');
  const btnMediaIdades = document.getElementById('btnMediaIdades');
  const btnOrdemAlfabetica = document.getElementById('btnOrdemAlfabetica');
  const btnPorCurso = document.getElementById('btnPorCurso');
  const relatorioResultado = document.getElementById('relatorioResultado');

  const limparFormulario = () => {
    form.reset();
    inputNome.focus();
    indiceEditando = -1;
    btnAtualizar.classList.add('hidden');
    btnCadastrar.classList.remove('hidden');
  };

  const validarFormulario = () => {
    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const curso = selectCurso.value;
    const notaFinal = Number(inputNotaFinal.value);

    if (!nome) {
      alert('Por favor, informe o nome do aluno.');
      inputNome.focus();
      return false;
    }
    if (!Number.isFinite(idade) || idade <= 0) {
      alert('Informe uma idade válida.');
      inputIdade.focus();
      return false;
    }
    if (!curso) {
      alert('Selecione um curso.');
      selectCurso.focus();
      return false;
    }
    if (!Number.isFinite(notaFinal) || notaFinal < 0 || notaFinal > 10) {
      alert('Informe uma nota final válida (0 a 10).');
      inputNotaFinal.focus();
      return false;
    }
    return true;
  };

  const criarAlunoAPartirDoFormulario = () => {
    return new Aluno(
      inputNome.value.trim(),
      Number(inputIdade.value),
      selectCurso.value,
      Number(inputNotaFinal.value)
    );
  };

  const renderTabela = () => {
    tabelaBody.innerHTML = '';

    alunos.forEach((aluno, index) => {
      const tr = document.createElement('tr');

      const tdNome = document.createElement('td');
      tdNome.className = 'border border-gray-300 px-4 py-2';
      tdNome.textContent = aluno.nome;
      tr.appendChild(tdNome);

      const tdIdade = document.createElement('td');
      tdIdade.className = 'border border-gray-300 px-4 py-2';
      tdIdade.textContent = aluno.idade;
      tr.appendChild(tdIdade);

      const tdCurso = document.createElement('td');
      tdCurso.className = 'border border-gray-300 px-4 py-2';
      tdCurso.textContent = aluno.curso;
      tr.appendChild(tdCurso);

      const tdNota = document.createElement('td');
      tdNota.className = 'border border-gray-300 px-4 py-2';
      tdNota.textContent = aluno.notaFinal.toFixed(1);
      tr.appendChild(tdNota);

      const tdAprovado = document.createElement('td');
      tdAprovado.className = 'border border-gray-300 px-4 py-2';
      tdAprovado.textContent = aluno.isAprovado() ? 'Sim' : 'Não';
      tr.appendChild(tdAprovado);

      const tdAcoes = document.createElement('td');
      tdAcoes.className = 'border border-gray-300 px-4 py-2';

      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.className = 'mr-2 px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500';
      btnEditar.addEventListener('click', function () {
        inputNome.value = aluno.nome;
        inputIdade.value = aluno.idade;
        selectCurso.value = aluno.curso;
        inputNotaFinal.value = aluno.notaFinal;
        indiceEditando = index;
        btnAtualizar.classList.remove('hidden');
        btnCadastrar.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(`Editando aluno: ${aluno.toString()}`);
      });
      tdAcoes.appendChild(btnEditar);

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.className = 'px-3 py-1 rounded bg-red-400 hover:bg-red-500 text-white';
      btnExcluir.addEventListener('click', () => {
        if (confirm(`Deseja realmente excluir ${aluno.nome}?`)) {
          alunos.splice(index, 1);
          renderTabela();
          mostrarMensagem(`Aluno ${aluno.nome} excluído.`);
          console.log(`Aluno excluído: ${aluno.toString()}`);
        }
      });
      tdAcoes.appendChild(btnExcluir);

      tr.appendChild(tdAcoes);

      tabelaBody.appendChild(tr);
    });
  };

  const mostrarMensagem = (msg) => {
    alert(msg);
    console.log(msg);
  };

  btnCadastrar.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (!validarFormulario()) return;

    const novoAluno = criarAlunoAPartirDoFormulario();
    alunos.push(novoAluno);
    renderTabela();
    mostrarMensagem(`Aluno cadastrado: ${novoAluno.nome}`);
    limparFormulario();
  });

  btnAtualizar.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (indiceEditando < 0 || indiceEditando >= alunos.length) {
      alert('Nenhum aluno selecionado para atualização.');
      return;
    }
    if (!validarFormulario()) return;

    const alunoAtualizado = criarAlunoAPartirDoFormulario();
    alunos[indiceEditando] = alunoAtualizado;
    renderTabela();
    mostrarMensagem(`Dados atualizados: ${alunoAtualizado.nome}`);
    limparFormulario();
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!btnAtualizar.classList.contains('hidden')) {
      btnAtualizar.click();
    } else {
      btnCadastrar.click();
    }
  });

  btnAprovados.addEventListener('click', () => {
    const aprovados = alunos.filter((a) => a.isAprovado());
    if (aprovados.length === 0) {
      relatorioResultado.textContent = 'Nenhum aluno aprovado encontrado.';
      return;
    }
    const lista = aprovados.map((a) => `${a.nome} — Nota: ${a.notaFinal.toFixed(1)}`).join('\n');
    relatorioResultado.textContent = `Alunos Aprovados (${aprovados.length}):\n${lista}`;
    console.log('Relatório - aprovados:', aprovados);
  });

  btnMediaNotas.addEventListener('click', () => {
    if (alunos.length === 0) {
      relatorioResultado.textContent = 'Não há alunos para calcular a média das notas.';
      return;
    }
    const somaNotas = alunos.map(a => a.notaFinal).reduce((acc, cur) => acc + cur, 0);
    const media = somaNotas / alunos.length;
    relatorioResultado.textContent = `Média das notas finais: ${media.toFixed(2)}`;
    console.log('Relatório - média notas:', media);
  });

  btnMediaIdades.addEventListener('click', () => {
    if (alunos.length === 0) {
      relatorioResultado.textContent = 'Não há alunos para calcular a média das idades.';
      return;
    }
    const somaIdades = alunos.map(a => a.idade).reduce((acc, cur) => acc + cur, 0);
    const mediaIdades = somaIdades / alunos.length;
    relatorioResultado.textContent = `Média das idades: ${mediaIdades.toFixed(2)} anos`;
    console.log('Relatório - média idades:', mediaIdades);
  });

  btnOrdemAlfabetica.addEventListener('click', () => {
    if (alunos.length === 0) {
      relatorioResultado.textContent = 'Não há alunos para ordenar.';
      return;
    }
    const nomesOrdenados = alunos
      .map(a => a.nome)
      .slice() 
      .sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));

    relatorioResultado.textContent = `Alunos em ordem alfabética:\n${nomesOrdenados.join('\n')}`;
    console.log('Relatório - ordem alfabética:', nomesOrdenados);
  });

  btnPorCurso.addEventListener('click', () => {
    if (alunos.length === 0) {
      relatorioResultado.textContent = 'Não há alunos para agrupar por curso.';
      return;
    }
    const qtdPorCurso = alunos.reduce((acc, aluno) => {
      acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
      return acc;
    }, {});
    const linhas = Object.entries(qtdPorCurso).map(([curso, qtd]) => `${curso}: ${qtd}`);
    relatorioResultado.textContent = `Quantidade de alunos por curso:\n${linhas.join('\n')}`;
    console.log('Relatório - por curso:', qtdPorCurso);
  });

  inputNome.focus();

  window._DevTech = {
    alunos,
    renderTabela,
    limparFormulario
  };

})();

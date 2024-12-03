import { NavLink } from "react-router-dom"
import service from "../service"

export default function Dashboard({
  printersData,
  visible,
  setActiveScreen,
  activeScreen,
  refreshData
}) {

  async function getPdfReportAction() {
    await service.getPdfReport()
    alert('Relarório baixado com sucesso!')
  }

  return (
    <>
      <div className={visible ? 'block' : 'hidden'}>
        <div className="flex justify-center items-center h-svh">
          <div className="w-[85%] md:w-[75%] lg:w-[55%]">

            <h1 className="text-2xl font-bold pb-4">Inventário de Impressoras</h1>
            <p className="italic text-slate-500 md:w-[65%] mb-2">Inventário de impressoras do Hospital Santa Clara, adicione novas impressoras, mova impressoras de setor e extraia relatórios</p>

            <div className="md:grid grid-cols-2">
              <div className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <div className="w-[25%]">
                    <h3 className="text-6xl">🖨</h3>
                  </div>
                  <div className="w-[80%] flex justify-center items-center">
                    <h3 className="font-semibold text-xl mb-2 w-[55%]">Impressoras no Inventário</h3>
                    <p className="text-6xl text-blue-500 text-center font-semibold w-[30%]">{printersData?.length}</p>
                  </div>
                </div>
              </div>

              <div className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <div className="w-[25%]">
                    <h3 className="text-6xl">🖥</h3>
                  </div>
                  <div className="w-[80%] flex justify-center items-center">
                    <h3 className="font-semibold text-xl mb-2 w-[55%]">PCs Para Descarte</h3>
                    <p className="text-6xl text-blue-500 text-center font-semibold w-[30%]">00</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setActiveScreen('form')}
                className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 cursor-pointer transition hover:scale-[1.02] hover:border-blue-400"
              >
                <div className="flex justify-center items-center">
                  <div>
                    <h3 className="text-6xl mr-2">📋</h3>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Nova Impressora</h3>
                    <p className="italic text-slate-500">
                      Realizar cadastro de novas impressoras no Inventário
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setActiveScreen('printers-list')}
                className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 cursor-pointer transition hover:scale-[1.02] hover:border-blue-400"
              >
                <div className="flex justify-center items-center">
                  <div>
                    <h3 className="text-6xl mr-2">📝</h3>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Ver Impressoras </h3>
                    <p className="italic text-slate-500">
                      Veja, exclua, edite ou mova impressoras de setor na listagem do inventário
                    </p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setActiveScreen('disposal-form')}
                className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 cursor-pointer transition hover:scale-[1.02] hover:border-blue-400"
              >
                <div className="flex justify-center items-center">
                  <div>
                    <h3 className="text-6xl mr-2">🗑</h3>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Formulário de Descarte</h3>
                    <p className="italic text-slate-500">
                      Acesse o formulário para cadastro de itens para descarte
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 cursor-pointer transition hover:scale-[1.02] hover:border-blue-400"
                onClick={() => getPdfReportAction()}
              >
                <div className="flex justify-center items-center">
                  <div>
                    <h3 className="text-6xl mr-2">📄</h3>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Baixar Relatório</h3>
                    <p className="italic text-slate-500">
                      Baixe um PDF com a lista atualizada das impressoras
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
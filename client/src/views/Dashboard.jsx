import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import service from "../service"

export default function Dashboard() {

  const [totalPrinters, setTotalPrinters] = useState(0)

  useEffect(() => {

    async function getPrintersLengthAction() {
      try {

        const response = await service.getPrinters()
        setTotalPrinters(response.data.length)

      } catch (error) {
        console.error(error)
      }
    }

    getPrintersLengthAction()

  }, [totalPrinters])

  async function getPdfReportAction() {
    await service.getPdfReport()
    alert('Relarório baixado com sucesso!')
  }

  return (
    <>
      <div className="flex justify-center items-center h-svh">
        <div className="w-[85%] md:w-[75%] lg:w-[55%]">

          <h1 className="text-2xl font-bold pb-4">Inventário de Impressoras</h1>
          <p className="italic text-slate-500 md:w-[65%] mb-2">Inventário de impressoras do Hospital Santa Clara, adicione novas impressoras, mova impressoras de setor e extraia relatórios</p>

          <div className="md:grid grid-cols-2">
            <div className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 flex justify-center items-center">
              <h3 className="font-semibold text-xl mb-2 w-[55%]">🖨 Impressoras no Inventário</h3>
              <p className="text-6xl text-blue-500 text-center font-semibold w-[40%]">{totalPrinters}</p>
            </div>

            <NavLink to={"/form"}>
              <div className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 cursor-pointer transition hover:scale-[1.02] hover:border-blue-400">
                <h3 className="font-semibold text-xl mb-2">📋 Cadastrar Impressora</h3>
                <p className="italic text-slate-500">
                  Realizar cadastro de novas impressoras no Inventário á partir dos dados solicitados
                </p>
              </div>
            </NavLink>

            <NavLink to={"/printers"}>
              <div className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 cursor-pointer transition hover:scale-[1.02] hover:border-blue-400">
                <h3 className="font-semibold text-xl mb-2">📝 Acessar Inventário </h3>
                <p className="italic text-slate-500">
                  Veja, exclua, edite ou mova impressoras de setor na listagem do inventário
                </p>
              </div>
            </NavLink>

            <div
              className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 cursor-pointer transition hover:scale-[1.02] hover:border-blue-400"
              onClick={() => getPdfReportAction()}
            >
              <h3 className="font-semibold text-xl mb-2">📄 Baixar Relatório</h3>
              <p className="italic text-slate-500">
                Baixe um PDF com a lista atualizada das impressoras do inventário
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
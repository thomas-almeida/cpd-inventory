import { NavLink } from "react-router-dom"

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-center items-center h-svh">
        <div className="w-[85%]">

          <h1 className="text-2xl font-bold pb-4">Inventário de Impressoras</h1>
          <p className="italic text-slate-500 md:w-[65%] mb-2">Inventário de impressoras do Hospital Santa Clara, adicione novas impressoras, mova impressoras de setor e extraia relatórios</p>

          <div className="md:grid grid-cols-2">
            <div className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 flex justify-center items-center">
              <h3 className="font-semibold text-xl mb-2 w-[55%]">🖨 Impressoras no Inventário</h3>
              <p className="text-6xl text-blue-500 text-center font-semibold w-[40%]">00</p>
            </div>

            <NavLink to={"/form"}>
              <div className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 cursor-pointer transition hover:scale-[1.02] hover:border-blue-400">
                <h3 className="font-semibold text-xl mb-2">📋 Cadastrar Impressora</h3>
                <p className="italic text-slate-500">
                  Realizar cadastro de novas impressoras no Inventário
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

            <div className="border-4 p-4 py-6 my-2 rounded-md shadow-sm h-[150px] mx-2 cursor-pointer transition hover:scale-[1.02] hover:border-blue-400">
              <h3 className="font-semibold text-xl mb-2">📄 Imprimir Relatório</h3>
              <p className="italic text-slate-500">
                Imprima um PDF com a lista atualizada de impressoras no Inventário
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
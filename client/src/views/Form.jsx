
import { NavLink } from "react-router-dom"

export default function Form() {

  return (
    <>
      <div className="flex justify-center items-center h-svh">
        <div className="w-[90%] md:w-[50%]">
          <h1 className="text-center font-bold text-xl mb-6">Cadastro de Inventário</h1>

          <div className="py-4 rounded-md">

            <div className="mx-4 my-4">
              <p className="mb-2 text-lg">Modelo</p>
              <select
                className="border text-black cursor-pointer py-1 px-2 w-full text-lg"
              >
                <option value="M-3020">M-3020</option>
                <option value="M-4070">M-4070</option>
              </select>
            </div>

            <div className="mx-4 my-4">
              <p className="mb-2 text-lg">Endereço IP</p>
              <input
                type="text"
                className="border rounded-sm outline-blue-500 px-2 py-1 w-full text-lg"
                placeholder="192.168.11.190"
              />
            </div>

            <div className="mx-4 my-4">
              <p className="mb-2 text-lg">Status do Fusor</p>
              <select
                className="border text-black cursor-pointer py-1 px-2 w-full text-lg"
              >
                <option value="Bom">Bom</option>
                <option value="Ruim">Ruim</option>
              </select>
            </div>

            <div className="mx-4 my-4">
              <p className="mb-2 text-lg">Setor</p>
              <input
                type="password"
                className="border rounded-sm outline-blue-500 px-2 py-1 w-full text-lg"
                placeholder="01º Andar"
              />
            </div>

            <div className="flex justify-center flex-col mt-4 px-4">
              <button className="text-center border w-full my-4 p-2 rounded-md bg-blue-500 text-white font-semibold cursor-pointer">
                Cadastrar
              </button>
              
              <NavLink to={"/"}>
                <button className="text-center border w-full p-2 rounded-md border-blue-500 text-blue-500 font-semibold cursor-pointer">
                  Voltar
                </button>
              </NavLink>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
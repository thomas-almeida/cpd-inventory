
import { useState } from "react"
import service from "../service/index.js"
import options from "../utils/options.js"

export default function Form({
  visible,
  printersData,
  setActiveScreen,
  activeScreen,
  refreshData
}) {


  const [formData, setFormData] = useState({
    model: "",
    ipAddress: "",
    fusorStatus: "",
    level: "",
    observation: ""
  })

  const [isFetching, setIsFetching] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  async function addPrinterAction(e) {

    e.preventDefault()
    setIsFetching(true)

    try {
      const response = await service.addPrinter(formData)
      alert(response.message || "Impressora Cadastrada!")
      setFormData({
        model: "",
        ipAddress: "",
        fusorStatus: "",
        level: "",
        observation: ""
      })
    } catch (error) {
      console.error("Erro ao cadastrar impressora", error)
      alert("Erro ao cadastrar impressora")
    } finally {
      setIsFetching(false)
      refreshData()
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-svh overflow-y-auto">
        <div className="w-[90%] lg:w-[40%]">
          <h1 className="text-center font-bold text-xl mb-2">
            Cadastro de Inventário
          </h1>

          <form onSubmit={addPrinterAction} className="py-4 rounded-md">
            <div className="mx-4 my-4">
              <p className="mb-2 text-lg">Modelo</p>
              <select
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="border-2 rounded-md outline-blue-500 text-black cursor-pointer py-1 px-2 w-full text-lg"
              >
                <option value="" disabled>
                  Selecione
                </option>
                {options.printersOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mx-4 my-4">
              <p className="mb-2 text-lg">Endereço IP</p>
              <input
                type="text"
                name="ipAddress"
                value={formData.ipAddress}
                onChange={handleChange}
                className="border-2 rounded-md outline-blue-500 px-2 py-1 w-full text-lg"
                placeholder="192.168.11.190"
              />
            </div>

            <div className="mx-4 my-4">
              <p className="mb-2 text-lg">Estado da impressora (Fusor, Rolete, etc..)</p>
              <select
                name="fusorStatus"
                value={formData.fusorStatus}
                onChange={handleChange}
                className="border-2 rounded-md outline-blue-500 text-black cursor-pointer py-1 px-2 w-full text-lg"
              >
                <option value="" disabled>
                  Selecione
                </option>
                {options.fusorStatusOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mx-4 my-4">
              <p className="mb-2 text-lg">Setor</p>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="border-2 rounded-md outline-blue-500 text-black cursor-pointer py-1 px-2 w-full text-lg"
              >
                <option value="" disabled>
                  Selecione
                </option>
                {options.levelsOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mx-4 my-4">
              <p className="mb-2 text-lg">Observações</p>
              <textarea
                name="observation"
                value={formData.observation}
                onChange={handleChange}
                className="border-2 w-full rounded-md outline-blue-500 p-2"
                rows={1}
              ></textarea>
            </div>

            <div className="flex justify-center flex-col mt-4 px-4">
              <button
                type="submit"
                disabled={isFetching}
                className="text-center border w-full my-4 p-2 rounded-md bg-blue-500 text-white font-semibold cursor-pointer"
              >
                {isFetching ? "Cadastrando..." : "Cadastrar"}
              </button>

                <button
                  type="button"
                  onClick={() => setActiveScreen('dashboard')}
                  className="text-center border w-full p-2 rounded-md border-blue-500 text-blue-500 font-semibold cursor-pointer"
                >
                  Voltar
                </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
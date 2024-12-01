import { NavLink } from "react-router-dom"
import { useState } from "react"
import options from "../utils/options"
import service from "../service"

export default function PrinterList({
  printersData,
  visible,
  setActiveScreen,
  activeScreen,
  refreshData
}) {

  const headers = ['Modelo', 'IP', 'Estado', 'Andar', 'OBS', 'Ações']
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const [formData, setFormData] = useState({
    id: "",
    model: "",
    ipAddress: "",
    fusorStatus: "",
    level: "",
    observation: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function closeModal() {
    if (editModalVisible) {
      setEditModalVisible(false)
    }
  }

  function openModalToEdit(printerData) {

    setFormData({
      id: printerData?.id,
      model: printerData?.model,
      ipAddress: printerData?.ipAddress,
      fusorStatus: printerData?.fusorStatus,
      level: printerData?.level,
      observation: printerData?.observation
    })

    setEditModalVisible(true)
  }

  async function addPrinterAction(e) {

    e.preventDefault()
    setIsFetching(true)

    try {
      const response = await service.addPrinter(formData)
      alert(response.message || "Impressora Cadastrada!")
      setFormData({
        id: "",
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
      <div className={visible ? 'block' : 'hidden'}>
        <div className={`${editModalVisible ? 'absolute flex justify-center items-center bg-[#00000060] z-[999] h-screen w-full' : 'hidden'}`}>
          <div className="border bg-white w-[40%] p-4 rounded-md shadow-md">
            <h1 className="text-center">Editar Impressora</h1>

            <form onSubmit={addPrinterAction} className="py-4 rounded-md">

              <div className="mx-4 my-4">
                <p className="mb-2 text-lg">Modelo</p>
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="border text-black cursor-pointer py-1 px-2 w-full text-lg"
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
                  className="border rounded-sm outline-blue-500 px-2 py-1 w-full text-lg"
                  placeholder="192.168.11.190"
                />
              </div>

              <div className="mx-4 my-4">
                <p className="mb-2 text-lg">Estado da impressora (Fusor, Rolete, etc..)</p>
                <select
                  name="fusorStatus"
                  value={formData.fusorStatus}
                  onChange={handleChange}
                  className="border text-black cursor-pointer py-1 px-2 w-full text-lg"
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
                  className="border text-black cursor-pointer py-1 px-2 w-full text-lg"
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
                  className="w-full border rounded-md outline-blue-500 p-2"
                  rows={2}
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
                  onClick={() => closeModal()}
                  className="text-center border w-full p-2 rounded-md border-blue-500 text-blue-500 font-semibold cursor-pointer"
                >
                  Voltar
                </button>
              </div>

            </form>

          </div>
        </div>

        <div className="flex justify-center items-center h-svh">
          <div className="w-[90%] md:w-auto">
            <h1 className="text-center text-2xl font-semibold mb-6">Inventário de Impressoras</h1>

            <div className="border rounded-md shadow-sm overflow-auto p-4  sm:h-[300px] lg:h-[500px]">
              <table className="">
                <thead>
                  <tr>
                    {
                      headers.map((item) => (
                        <th className="w-auto p-2 px-4">
                          {item}
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    printersData !== undefined ?
                      printersData?.map((printer) => (
                        <tr className="border">
                          <td className="px-2 py-1 font-bold text-slate-700">{printer?.model}</td>
                          <td className="px-4 py-1 font-semibold text-blue-500">{printer?.ipAddress}</td>
                          <td className={`px-2 py-1 font-semibold ${printer?.fusorStatus == 'BOM' ? 'text-green-500' : 'text-red-500'}`}>{printer?.fusorStatus}</td>
                          <td className="px-6 py-1 font-semibold text-slate-800">{printer?.level}</td>
                          <td className="px-4 py-1">{printer?.observation}</td>
                          <td className="px-2 py-1 flex justify-center">
                            <p
                              className="mx-2 cursor-pointer border p-1 px-4 rounded-md bg-slate-100 shadow-sm hover:border-blue-400"
                              onClick={() => openModalToEdit(printer)}
                            >
                              Editar ✏
                            </p>
                          </td>
                        </tr>
                      ))
                      : ''
                  }
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center items-center">
              <button
                onClick={() => setActiveScreen('dashboard')}
                className="text-center border w-auto p-2 px-4 rounded-md border-blue-500 text-blue-500 font-semibold cursor-pointer"
              >
                Voltar
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
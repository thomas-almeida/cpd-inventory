import { useState } from "react"
import service from "../service/index.js"
import options from "../utils/options"

export default function DisposalForm({
  visible,
  setActiveScreen,
  activeScreen,
}) {

  const [formData, setFormData] = useState({
    patrimonio: "",
    modelo: "",
    motivo: "",
    pecas: [],
    observacoes: "",
    responsavelTI: ""
  })

  const [isFetching, setIsFetching] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    console.log(e.target.value, formData.pecas)
    setFormData((prevData) => {
      const updatedOptions = checked
        ? [...prevData.pecas, value] // Adiciona a opção selecionada
        : prevData.pecas.filter((item) => item !== value) // Remove a opção desmarcada
      return {
        ...prevData,
        pecas: updatedOptions,
      }
    })
  }

  async function addDisposalIntentAction(e) {
    e.preventDefault()
    setIsFetching(true)

    try {
      const pecasStringfy = formData.pecas.toString()
      const payload = {...formData, pecas: pecasStringfy}

      const response = await service.addDisposalIntent(payload)
      alert(response.message || "Equipamento de Descarte Adionado")

      setFormData({
        patrimonio: "",
        modelo: "",
        motivo: "",
        pecas: [],
        observacoes: "",
        responsavelTI: ""
      })

    } catch (err) {
      console.error(err)
      alert("Erro ao cadastrar equipamento")
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <>

      <div className="flex justify-center items-center h-svh overflow-y-auto ">
        <div className="w-[90%] lg:w-[40%]">
          <h1 className="text-center font-bold text-xl mb-2">
            Formulário de Descarte de Equipamento
          </h1>

          <form onSubmit={addDisposalIntentAction} className="py-4 rounded-md">

            <div className="grid grid-cols-2">

              <div className="mx-4 my-4">
                <p className="mb-2 text-lg">Número do Patrimônio</p>
                <input
                  type="text"
                  name="patrimonio"
                  value={formData.patrimonio}
                  onChange={handleChange}
                  className="border rounded-sm outline-blue-500 px-2 py-1 w-full text-lg"
                  placeholder="Ex: 102485"
                />
              </div>

              <div className="mx-4 my-4">
                <p className="mb-2 text-lg">Modelo</p>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="border rounded-sm outline-blue-500 px-2 py-1 w-full text-lg"
                  placeholder="Samsung"
                />
              </div>

              <div className="mx-4 my-4">
                <p className="mb-2 text-lg">Motivo do Descarte</p>
                <input
                  type="text"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  className="border rounded-sm outline-blue-500 px-2 py-1 w-full text-lg"
                  placeholder="Peças queimadas"
                />
              </div>

              <div className="mx-4 my-4">
                <p className="mb-2 text-lg">Observação</p>
                <input
                  type="text"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  className="border rounded-sm outline-blue-500 px-2 py-1 w-full text-lg"
                  placeholder="..."
                />
              </div>

              <div className="mx-4 my-4">
                <p className="mb-2 text-lg">Técnico responsável pelo descarte</p>
                <input
                  type="text"
                  name="responsavelTI"
                  value={formData.responsavelTI}
                  onChange={handleChange}
                  className="border rounded-sm outline-blue-500 px-2 py-1 w-full text-lg"
                  placeholder="Nome do Técnico"
                />
              </div>

            </div>

            <div className="mx-4 my-4 ">
              <p className="mb-2 text-lg">Peças do Equipamento</p>
              <div className="grid grid-cols-3 mt-2 border p-2 rounded-md shadow-sm">
                {
                  options.hardwareOptions.map((item, index) => (
                    <span className="flex">
                      <input
                        key={item[index]}
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={formData.pecas.includes(item)}
                        name={item}
                        value={item}
                        className="cursor-pointer"
                      />
                      <p className="ml-1 text-lg">{item}</p>
                    </span>
                  ))
                }
              </div>
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
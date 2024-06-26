
export default function Form() {
  return (
    <form>
      <div>
        <label htmlFor="city">Ciudad</label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Ciudad"
        />
      </div>

      <div>
        <label htmlFor="city">Pais</label>
        <input
          id="pais"
          type="text"
          name="pais"
          placeholder="Pais"
        />
      </div>
    </form>
  )
}

import { ChevronDown } from "lucide-react"

const PROVINCES = ["Kigali", "South", "West", "North", "East"]

const DISTRICTS = {
  Kigali: ["Gasabo", "Kicukiro", "Nyarugenge"],
  North: ["Musanze", "Burera", "Gicumbi", "Rulindo", "Gakenke"],
  South: ["Huye", "Muhanga", "Nyamagabe", "Ruhango", "Nyabahke"],
  West: ["Rubavu", "Nyabihu", "Ngorere", "Karongi", "Nyamasheke"],
  East: ["Rwamagana", "Kayonza", "Ngoma", "Kirehe", "Gatsibo"],
}

const SECTORS = {
  Gasabo: ["Kimironko", "Remera", "Gisozi", "Kacyiru", "Niboye"],
  Kicukiro: ["Kicukiro", "Nyamata", "Bugesera", "Muganza"],
  Nyarugenge: ["Nyarugenge", "Nyamirambo", "Kimironko", "Bujundji"],
  Musanze: ["Musanze", "Shango", "Gukomeza", "Bucyaba"],
  Huye: ["Huye", "Tbagata", "Marangara", "Munyinya"],
  Rubavu: ["Rubavu", "Gisenyi", "Mageragere", "Kivu"],
  Muhanga: ["Muhanga", "Nsange", "Kigoma", "Rongi"],
  Rwamagana: ["Rwamagana", "Munyinya", "Munyigwi", "Kigabiro"],
  Burera: ["Burera", "Rugando", "Cyanika", "Kimironko"],
  Gicumbi: ["Gicumbi", "Muyumbu", "Myanjing", "Rukuyu"],
}

const CELLS = {
  Remera: ["Kimironko", "Gisozi", "Kacyiru"],
  Kimironko: ["Kimironko", "Gisozi", "Kacyiru"],
  Gasabo: ["Kimironko", "Gisozi", "Kacyiru"],
  Kicukiro: ["Kicukiro", "Nyamata", "Muganza"],
  Nyarugenge: ["Nyarugenge", "Nyamirambo", "Bujundji"],
  Musanze: ["Musanze", "Shango", "Gukomeza"],
  Huye: ["Huye", "Tbagata", "Marangara"],
  Rubavu: ["Rubavu", "Gisenyi", "Kivu"],
  Muhanga: ["Muhanga", "Nsange", "Kigoma"],
  Rwamagana: ["Rwamagana", "Munyinya", "Kigabiro"],
}

export const DeliveryAddress = ({ address, onChange, errors }) => {
  const getDistrictsForProvince = (province) => {
    return DISTRICTS[province] || []
  }

  const getSectorsForDistrict = (district) => {
    return SECTORS[district] || []
  }

  const getCellsForSector = (sector) => {
    return CELLS[sector] || []
  }

  const handleProvinceChange = (e) => {
    onChange({
      ...address,
      province: e.target.value,
      district: "",
      sector: "",
      cell: "",
    })
  }

  const handleDistrictChange = (e) => {
    onChange({
      ...address,
      district: e.target.value,
      sector: "",
      cell: "",
    })
  }

  const handleSectorChange = (e) => {
    onChange({
      ...address,
      sector: e.target.value,
      cell: "",
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text">Delivery Address</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text mb-1">
            Province *
          </label>
          <select
            value={address.province || ""}
            onChange={handleProvinceChange}
            className={`w-full rounded-md border bg-surface px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors?.province ? "border-error" : "border-border"
            }`}
          >
            <option value="">Select Province</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors?.province && (
            <p className="mt-1 text-xs text-error">{errors.province}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            District *
          </label>
          <select
            value={address.district || ""}
            onChange={handleDistrictChange}
            disabled={!address.province}
            className={`w-full rounded-md border bg-surface px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 ${
              errors?.district ? "border-error" : "border-border"
            }`}
          >
            <option value="">Select District</option>
            {getDistrictsForProvince(address.province).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors?.district && (
            <p className="mt-1 text-xs text-error">{errors.district}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Sector *
          </label>
          <select
            value={address.sector || ""}
            onChange={handleSectorChange}
            disabled={!address.district}
            className={`w-full rounded-md border bg-surface px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 ${
              errors?.sector ? "border-error" : "border-border"
            }`}
          >
            <option value="">Select Sector</option>
            {getSectorsForDistrict(address.district).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors?.sector && (
            <p className="mt-1 text-xs text-error">{errors.sector}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text mb-1">
            Cell *
          </label>
          <select
            value={address.cell || ""}
            onChange={(e) =>
              onChange({ ...address, cell: e.target.value })
            }
            disabled={!address.sector}
            className={`w-full rounded-md border bg-surface px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 ${
              errors?.cell ? "border-error" : "border-border"
            }`}
          >
            <option value="">Select Cell</option>
            {getCellsForSector(address.sector).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors?.cell && (
            <p className="mt-1 text-xs text-error">{errors.cell}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text mb-1">
            Street / Area *
          </label>
          <input
            type="text"
            placeholder="e.g. Near Remera Catholic Church"
            value={address.street || ""}
            onChange={(e) =>
              onChange({ ...address, street: e.target.value })
            }
            className={`w-full rounded-md border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
              errors?.street ? "border-error" : "border-border"
            }`}
          />
          {errors?.street && (
            <p className="mt-1 text-xs text-error">{errors.street}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text mb-1">
            Delivery Instructions
          </label>
          <input
            type="text"
            placeholder="e.g. Call before delivery, leave at gate"
            value={address.notes || ""}
            onChange={(e) =>
              onChange({ ...address, notes: e.target.value })
            }
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  )
}

export { PROVINCES, DISTRICTS, SECTORS, CELLS }
export default DeliveryAddress

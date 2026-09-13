import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Save } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { PROVINCES, DISTRICTS, SECTORS, CELLS } from "../components/DeliveryAddress"
import EmptyState from "../components/EmptyState"

export const Profile = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: {
      province: user?.address?.province || "Kigali",
      district: user?.address?.district || "Gasabo",
      sector: user?.address?.sector || "Remera",
      cell: user?.address?.cell || "Kimironko",
      street: user?.address?.street || "",
    },
  })

  const getDistrictsForProvince = (province) => {
    return DISTRICTS[province] || []
  }

  const getSectorsForDistrict = (district) => {
    return SECTORS[district] || []
  }

  const getCellsForSector = (sector) => {
    return CELLS[sector] || []
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState
          title="Please Login"
          description="You need to be logged in to view your profile."
          actionLabel="Login"
          onAction={() => navigate("/login")}
        />
      </div>
    )
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }))
  }

  const handleProvinceChange = (e) => {
    handleAddressChange("province", e.target.value)
    handleAddressChange("district", "")
    handleAddressChange("sector", "")
    handleAddressChange("cell", "")
  }

  const handleDistrictChange = (e) => {
    handleAddressChange("district", e.target.value)
    handleAddressChange("sector", "")
    handleAddressChange("cell", "")
  }

  const handleSectorChange = (e) => {
    handleAddressChange("sector", e.target.value)
    handleAddressChange("cell", "")
  }

  const handleSave = () => {
    alert("Profile updated! (Demo - changes saved to localStorage)")
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">My Profile</h1>
        {isEditing ? (
          <button
            onClick={handleSave}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
          >
            <Save className="h-4 w-4 inline mr-1" />
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-md border border-border bg-surface-alt px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface"
          >
            <User className="h-4 w-4 inline mr-1" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-text">Personal Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="input"
                />
              ) : (
                <p className="text-text">{user?.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="input"
                />
              ) : (
                <p className="text-text">{user?.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="input"
                />
              ) : (
                <p className="text-text">{user?.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Account Type
              </label>
              <p className="text-text capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-text">
              Delivery Address
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Province
                </label>
                <select
                  value={formData.address.province || ""}
                  onChange={handleProvinceChange}
                  className="input"
                >
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  District
                </label>
                <select
                  value={formData.address.district || ""}
                  onChange={handleDistrictChange}
                  className="input"
                >
                  <option value="">Select District</option>
                  {getDistrictsForProvince(formData.address.province).map(
                    (d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Sector
                </label>
                <select
                  value={formData.address.sector || ""}
                  onChange={handleSectorChange}
                  className="input"
                >
                  <option value="">Select Sector</option>
                  {getSectorsForDistrict(formData.address.district).map(
                    (s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  Cell
                </label>
                <select
                  value={formData.address.cell || ""}
                  onChange={(e) => handleAddressChange("cell", e.target.value)}
                  className="input"
                >
                  <option value="">Select Cell</option>
                  {getCellsForSector(formData.address.sector).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-text mb-1">
                  Street / Area
                </label>
                <input
                  type="text"
                  value={formData.address.street || ""}
                  onChange={(e) =>
                    handleAddressChange("street", e.target.value)
                  }
                  className="input"
                  placeholder="e.g. Near Remera Catholic Church"
                />
              </div>
            </div>
          </div>
        )}

        {!isEditing && (
          <div className="border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-text">Saved Address</h2>
            <p className="mt-2 text-sm text-text-secondary">
              {user?.address?.province}, {user?.address?.district},{" "}
              {user?.address?.sector}, {user?.address?.cell}
            </p>
            <p className="text-sm text-text-secondary">
              {user?.address?.street || "No street specified"}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <h2 className="text-lg font-semibold text-text mb-4">Account Settings</h2>
        <div className="space-y-2">
          <Link
            to="/orders"
            className="flex items-center gap-2 rounded-md p-2 text-sm text-text-secondary hover:bg-surface-alt"
          >
            My Orders
          </Link>
          <Link
            to="/favorites"
            className="flex items-center gap-2 rounded-md p-2 text-sm text-text-secondary hover:bg-surface-alt"
          >
            My Favorites
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-text-secondary hover:bg-surface-alt"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile

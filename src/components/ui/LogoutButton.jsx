import LogoutIcon from "../../icons/LogoutIcon"

function LogoutButton() {
  return (
    <button className="flex gap-1 items-center justify-center font-bold bg-white rounded-lg text-[#004a99] px-3 py-2 cursor-pointer text-md leading-0 tracking-tighter">
        <LogoutIcon />
        Logout
    </button>
  )
}

export default LogoutButton
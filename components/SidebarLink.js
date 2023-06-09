import { useRouter } from "next/router";

function SidebarLink({Icon,text,active}) {// destructucturing icons from sidebar.js(props)
  const router = useRouter();
  return (
  <div className={`text-[#fff] flex 
  items-center} justify-center 
  xl:justify-start text-xl space-x-3 hoverAnimation ${active && "font-bold"}`}
  >
    <Icon className="h-7" />
    <span className="hidden xl:inline">{text}</span>
  </div>
  )
}

export default SidebarLink
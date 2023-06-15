import LogoSvg from "/logo/EsLogo.svg";

export default function Ui() {
  return (
    <header className='text-white z-2 w-full p-4 flex flex-row justify-between items-center'>
      <div className='flex items-center'>
        <a href='./' title="ES Home">
        <img src={LogoSvg} className='w-1/2 h-1/2'/>
        </a>
        </div>
      <div className='w-full flex justify-end items-center'>
        <nav className='overflow-hidden'>
          <div className=''>
        <a className='py-0.5 px-1' href="" >Projects</a>
        <a className='py-0.5 px-1 mr-[1rem]' href="" >Contact</a>
        </div>
        </nav>
      <button className='h-[2.5rem] w-[2.5rem] bg-white text-black border-solid rounded-full p-0'>..</button>
      </div>
    </header>
  )
}

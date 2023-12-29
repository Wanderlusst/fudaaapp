import { useTheme } from "./ThemeContext";

const Delivery = () => {
  const { themeMode } = useTheme(); 

  const divStyle = {
    backgroundColor: themeMode === 'dark' ? '#23272f' : 'white',
  };
  const fontStyle = {
    color: themeMode === 'dark' ? '#f6f7f9' : '#23272f',

  }
  return (
    <div className='w-full bg-white py-16 px-4' style={{ ...divStyle, ...fontStyle }}>
    <h3 className='text-orange-500 font-bold text-2xl text-center'>Quick Delivery App</h3>
    <div className='w=[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[550px] mx-auto my-4' src='https://res.cloudinary.com/dmq8ms9w3/image/upload/v1696929526/cld-sample-4.jpg'></img>
        <div className='flex flex-col justify-center' >
            <p className='text-[#00df9a] font-bold'>Get the App</p>
            <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Limitless on demand</h1>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            molestiae delectus culpa hic assumenda, voluptate reprehenderit
            dolore autem cum ullam sed odit perspiciatis. Doloribus quos velit,
            eveniet ex deserunt fuga? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatum molestiae delectus culpa hic assumenda,
            voluptate reprehenderit dolore autem cum ullam sed odit
            perspiciatis. Doloribus quos velit, eveniet ex deserunt fuga? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            molestiae delectus culpa hic assumenda, voluptate reprehenderit
            dolore autem cum ullam sed odit perspiciatis. Doloribus quos velit,
            eveniet ex deserunt fuga? 
            </p>
            <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
        </div>
    </div>
    </div>
  )
}

export default Delivery
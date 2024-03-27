import noProjectImage from '../../assets/book.jpeg'
import Button from './Button'
export default function NoProjectSelected({onStartAddProject}){
    return <div className=" flex flex-col justify-center items-center mt-24 text-center w-2/3">
        <img src={noProjectImage} alt="Empty list" className='w-16 h-16 object-contain mx-auto'/>

        <h2 className='text-xl font-bold text-stone-500 my-4'>No project selected</h2>
        <p>Selecciona una tarea o empieza uno</p>
        <p className='text-stone-400 mb-4'> </p>

            <p className='mt-8'></p>
           <Button
           onClick={onStartAddProject}
           >Crear nueva tarea</Button>
      
    </div>
}
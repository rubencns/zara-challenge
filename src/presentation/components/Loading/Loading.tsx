import style from './Loading.module.css'

const Loading = () => {
  return (
    <div className={style.loadingContainer} role="status" aria-label="Loading">
      <div className={style.spinner} />
    </div>
  )
}

export default Loading

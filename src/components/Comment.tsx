import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react'
interface CommentProps {
  content: string
  onDeleteComment: (comment: string) => void
}
export function Comment({content, onDeleteComment}: CommentProps) {

  const [likeCount, setLikeCount] = useState(0)

  const publishedDateFormatted = format( new Date(), "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(new Date(), { locale: ptBR, addSuffix: true })
  function handleDeleteComment() {
    onDeleteComment(content)
  }
  function handleLikeComment() {
    setLikeCount((state)=>{
      return state + 1
    })
  }
  return(
    <div className={styles.comment}>
      <Avatar 
        src="https://github.com/alanwengrze.png"
        hasBorder={false}
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Alan Wengrze</strong>
              <time title={publishedDateFormatted} dateTime={new Date().toISOString()}>{publishedDateRelativeToNow}</time>
            </div>
            <button 
              title='Deletar comentário'
              onClick={handleDeleteComment}
            >
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button
            onClick={handleLikeComment}
          >
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
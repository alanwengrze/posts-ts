import {  FormEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import styles from './Post.module.css'

export interface PostType {
  id: number
  author: Author
  content: Content[]
  publishedAt: Date
}

interface Author {
  avatarUrl: string
  name: string
  role: string
}
interface Content {
  type: "paragraph" | "link"
  content: string
}
interface PostProps {
  post: PostType
}
export function Post({ post }: PostProps) {

  const [comments, setComments] = useState([] as string[]);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })
  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, { locale: ptBR, addSuffix: true })

  function handleCreateNewComment(e: FormEvent) {
    e.preventDefault()
    setComments([...comments, newCommentText])
    setNewCommentText('')
  }


  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return(
    <article className={styles.post}>
      <header>

        <div className={styles.author}>
          <Avatar 
            src={post.author.avatarUrl}
            alt='imagem do usuário'
          />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
        </header>

        <div className={styles.content}>
          {
            post.content.map((line, index) => {
              if (line.type === 'paragraph') {
                return <p key={index}>{line.content}</p>
              } else if (line.type === 'link') {
                return <p key={index}><a href="#">{line.content}</a></p>
              }
            })
          }
        </div>
        <form 
          className={styles.commentForm}
          onSubmit={handleCreateNewComment}
        >
          <strong>Deixe seu feedback</strong>
          <textarea 
            placeholder="Deixe um comentário"
            onChange={e => setNewCommentText(e.target.value)}
            value={newCommentText}
            required
          />
          <footer>
            <button 
              type='submit'
              disabled={isNewCommentEmpty}

            >
              Publicar
            </button>
          </footer>
        </form>
        <div className={styles.commentList}>
          {
            comments.map((comment, index) => {
              return <Comment 
                key={index}
                content={comment}
                onDeleteComment={deleteComment}
              />
            })
          }
        </div>
    </article>
  )
}
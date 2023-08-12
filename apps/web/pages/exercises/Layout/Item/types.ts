import { HTMLAttributes } from 'react'

export type ItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {
  description: string
  id: string
  name: string
}

export type UseItemProps = {
  description: ItemProps['description']
  id: ItemProps['id']
  name: ItemProps['name']
}

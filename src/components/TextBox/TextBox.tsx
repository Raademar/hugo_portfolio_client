import React, { FunctionComponent } from 'react'
import styles from './TextBox.module.scss'

type Props = {
	texts: string[]
}

export const TextBox: FunctionComponent<Props> = (props: Props) => {
	const { texts } = props
	return (
		<section className={styles.container}>
			<>
				{texts.map(text => (
					<p className={styles.textBlock}>{text}</p>
				))}
			</>
		</section>
	)
}

import React, { FunctionComponent } from 'react'
import styles from './TextBox.module.scss'

type Props = {}

export const TextBox: FunctionComponent = (props: Props) => {
	return (
		<section className={styles.container}>
			<p className={styles.textBlock}>
				Together with our frequent collaborators Kasper-Florio we run Jungle
				Books, an independent publisher specializing in contemporary visual
				arts. We focus on Swiss art and architecture as well as conveying
				knowledge about these subjects in Switzerland and internationally. We
				aim to create new works in close cooperation with artists, designers,
				authors, and publishers.
			</p>
			<p className={styles.textBlock}>
				Architecture: Iñaki Abalos, Architektur Forum Ostschweiz, Atelier
				Miller, Architektura, Barão-Hutter, Christian Kerez, CO-G Architects,
				Bureau Dan Budik, Bollhalder Eberle, ETH Zurich, Forrer Stieger, HNA
				Architects, idA Architects, klotzholz, Karamuk Kuo Architects, Kummer +
				Partner, Labics, Studio Meili Vogt Conzett, Miller & Maranta, von
				Ballmoss Partner Architects, OePlan, Vogt Landscape Architects. Art /
				Culture / Fashion / Music: Alpenhof, Amt für Kultur, Art as Foundation,
				Bayerische Staatsoper, Beni Bischof, Biennale Venice, Bibliothek
				Hauptpost, Bibliothek Vadiana, Björn Dahlem, Chewing the Scenery,
				Katalin Deér, Glory Hazel, H.R. Fricker, Kaltehand Natascha Waters, Kram
				Weisshaar, Mara Züst, Mariel Manuel, Phytopharma, Schweizer Kunst, trans
				Magazine, tri Publications, We find Wildness, Zeughaus Teufen, Zwoelf
				Zwei. Institutions / Museum: EPFL, ETH Zurich, Federal Office of
				Culture, GSD Harvard Graduate School of Design, IEA Institut für Entwurf
				und Architektur, Accademia di architettura, Kunstmuseum St.Gallen,
				Kunstmuseum Solothurn, Kunsthaus Langenthal, Museum Rietberg, University
				of St.Gallen, Visarte. Publisher: Edition Patrick Frey, Edition Fink,
				GTA Verlag, Junge Books, kinki Magazine, Mendrisio Academy Press, Niggli
				Publishers, Park Books, Saiten, Scheidegger & Spiess, Vexer Verlag
			</p>
		</section>
	)
}

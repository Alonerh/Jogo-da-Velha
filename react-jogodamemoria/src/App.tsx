import { useEffect, useState } from 'react';
import * as C from './App.syles'; // Importa tudo e renomeia para C;
import logoImage from './assets/devmemory_logo.png'; // Nomeia o PNG como logoImage;
import RestartIcon from './svgs/restart.svg'
import { items } from './data/items'
import { GridItemType } from './types/GridItemType';
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

const App = ()=>{

	const [playing, setPlaying] = useState<boolean>(false);
	const [timeElapsed, setTimeElapsed] = useState<number>(0);
	const [moveCount, setMoveCount] = useState<number>(0);
	const [showCount, setShowCount] = useState<number>(0);
	const [gridItems, setGridItems] = useState<GridItemType[]>([]);

	useEffect(()=>resetAndCreateGrid(), [])

	useEffect(()=>{
		const timer = setInterval(()=>{
			if (playing) setTimeElapsed(timeElapsed + 1);
		}, 1000);
		return ()=> clearInterval(timer); // Zera o interval;
	}, [playing, timeElapsed]);

	// Verify if opened are equal
	useEffect(()=>{
		if (showCount === 2) {
			let opened = gridItems.filter(item=>item.shown === true);
			
			if(opened.length === 2) {

				if (opened[0].item === opened[1].item) {
					let tempGrid = [...gridItems];
				// v1 - If both are equal, make every "shown" permanent
					for (let i in tempGrid) {
						if (tempGrid[i].shown) {
							tempGrid[i].permanentShown = true;
							tempGrid[i].shown = false;
						}
					}
					setGridItems(tempGrid);
					setShowCount(0);
				// v2 - if they are not equal, so close all "shown"
				} else {
					setTimeout(()=>{
						let tempGrid = [...gridItems];
						for (let i in tempGrid) {
							tempGrid[i].shown = false;	
						}
						setGridItems(tempGrid);
						setShowCount(0);
					}, 1000);
				}
				

				setMoveCount(moveCount => moveCount + 1)
			}
		}
	}, [showCount, gridItems])

	// Verify the end of the game
	useEffect(()=>{
		if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
			setPlaying(false);
		}
	}, [moveCount, gridItems])

	// Functions
	const resetAndCreateGrid = ()=>{
		// Passo 1 - Resetar o jogo
			setTimeElapsed(0);
			setMoveCount(0);
			setShowCount(0);
		// Passo 2 - Criar o Grid e começar o jogo
		// 2.1 - Criar o Grid
		let tempGrid: GridItemType[] = [];
		for (let i = 0; i < (items.length * 2); i++) { // Pega os itens e multiplica por 2;
			tempGrid.push({
				item: null, shown: false, permanentShown: false
			});
		}
		// 2.2 - Preencher o Grid
		for (let w = 0; w < 2; w++) { // Rodará 2 vezes
			for (let i = 0; i < items.length; i++) {
				let pos = -1; // Pois 0 já é uma posição no Grid;
				// while aceita várias condições | Importante que o While consiga parar;
				while(pos < 0 || tempGrid[pos].item !== null) { // Enquanto a posição for -1 ou o item do Grid for nulo;
					pos = Math.floor(Math.random() * (items.length * 2)); 
				}
				// Número aleatório até item;
				tempGrid[pos].item = i; // Apenas item, pois o shown e permanentShow já foram colocados false;
			}
		}
		// 2.3 - Jogar no State;
		setGridItems(tempGrid);
		// Passo 3 - Começar o jogo
		setPlaying(true); // O React muda tudo de uma vez, então deixa só esse;
	}
	const handleItemClick = (index:number)=>{
		if(playing && index !== null && showCount < 2) {
			let tempGrid = [...gridItems];
			if (tempGrid[index].permanentShown === false && tempGrid[index].shown === false) {
				tempGrid[index].shown = true;
				setShowCount(showCount + 1);
			}
				setGridItems(tempGrid); // Substitui o grid antigo pela nova, com os itens aparecendo;
			}

	}


	return (
		<C.Container>
			<C.Info>
				<C.LogoLink href="">
					<img src={logoImage} alt="" width="200"/>
				</C.LogoLink>
				<C.InfoArea>
					<InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
					<InfoItem label='Movimentos' value={moveCount.toString()}/>
				</C.InfoArea>
				<Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>
			</C.Info>
			<C.GridArea>
				<C.Grid>
					{gridItems.map((item, index)=>(
						<GridItem
						key={index} 
						item={item}
						onClick={()=> handleItemClick(index)}
						/>
					))}
				</C.Grid>
			</C.GridArea>
		</C.Container>
		);
	}

	
export default App;
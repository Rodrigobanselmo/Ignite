import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Button } from '../../components/Form/Button';

import { categories } from '../../utils/categories';

export interface ListRenderItemInfo<ItemT> {
	item: ItemT;

	index: number;

	separators: {
			highlight: () => void;
			unhighlight: () => void;
			updateProps: (select: "leading" | "trailing", newProps: any) => void;
	};
}

import {
	Container,
	Header,
	Title,
	Category,
	Icon,
	Name,
	Separator,
	Footer,

} from './styles';

interface Category {
	key: string;
	name: string;
}

interface Props {
	category: Category;
	setCategory: (category: Category) => void;
	closeSelectCategory: () => void;
}

export function CategorySelect({
	category,
	setCategory,
	closeSelectCategory
} : Props) {
	function handleCategorySelect(category : Category){
		setCategory(category);
	}

	
	return (
		<Container>
			<Header>
				<Title>Categoria</Title>
			</Header>
			<FlatList
				data={categories}
				style={{flex: 1, width: '100%'}}
				keyExtractor={(item) => item.key}
				renderItem={({ item }: ListRenderItemInfo<typeof categories[0]>) => (
					<Category
						onPress={() => handleCategorySelect(item)}
						isActive={category.key === item.key}
					>
						<Icon name={ item.icon } />
						<Name> { item.name }</Name>
					</Category>
				)}
				ItemSeparatorComponent={() => <Separator />}
			/>
			<Footer>
				<Button
					title="Selecionar"
					onPress={closeSelectCategory}
				/>
			</Footer>
		</Container>
	)
}

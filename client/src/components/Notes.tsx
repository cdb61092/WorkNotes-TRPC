import React from 'react';
import {
	Stack,
	Container,
	Title,
	Badge,
	Flex,
	ScrollArea,
} from '@mantine/core';
import { trpc } from '../utils/trpc';

interface Note {
	title: string;
	content: string;
	tags: string[];
}

interface NoteProps {
	notes: Note[];
}

export const Notes = ({ notes }: NoteProps) => {
	return (
		<ScrollArea style={{ height: '100vh' }}>
			<Stack w={300}>
				{notes.map((note: Note) => {
					return (
						<div
							style={{
								borderBottom: '1px solid black',
								height: '250px',
								padding: '10px',
							}}
							key={note.title}
						>
							<Title order={5}>{note.title}</Title>
							<Flex gap={5} wrap="wrap">
								{note.tags.map((tag) => {
									return (
										<Badge style={{ whiteSpace: 'nowrap' }} key={tag}>
											{tag}
										</Badge>
									);
								})}
							</Flex>
						</div>
					);
				})}
			</Stack>
		</ScrollArea>
	);
};

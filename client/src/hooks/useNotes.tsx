import React, { useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';

export const useNotes = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState(
		'<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
	);
	const [tags, setTags] = useState<string[]>([]);
	const [tag, setTag] = useState('');

	const notesQuery = trpc.getNotes.useQuery();

	const noteMutation = trpc.create.useMutation({
		onSuccess: () => {
			notesQuery.refetch();
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const createNote = () => {
		noteMutation.mutate({
			title,
			content,
			tags,
		});
	};

	const filterTags = (tag: string) => {
		const newTags = tags.filter((t) => t !== tag);
		setTags(newTags);
	};

	return {
		title,
		setTitle,
		content,
		setContent,
		tags,
		setTags,
		tag,
		setTag,
		notes: notesQuery.data || [],
		createNote,
		filterTags,
	};
};

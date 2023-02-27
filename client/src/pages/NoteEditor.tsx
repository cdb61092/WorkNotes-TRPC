import React, { useState, useEffect } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { trpc } from '../utils/trpc';
import { Flex, Badge, Box } from '@mantine/core';
import { Notes } from '../components/Notes';
import { useNotes } from '../hooks/useNotes';

export const NoteEditor = () => {
	const {
		content,
		notes,
		tag,
		tags,
		title,
		setContent,
		setTag,
		setTags,
		setTitle,
		filterTags,
		createNote,
	} = useNotes();
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
		],
		content,
		onUpdate({ editor }) {
			setContent(editor.getHTML());
		},
	});

	return (
		<Flex>
			<Notes notes={notes} />
			<Box>
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<RichTextEditor editor={editor} style={{ background: 'blue' }}>
					<RichTextEditor.Toolbar sticky>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold />
							<RichTextEditor.Italic />
							<RichTextEditor.Underline />
							<RichTextEditor.Strikethrough />
							<RichTextEditor.ClearFormatting />
							<RichTextEditor.Highlight />
							<RichTextEditor.Code />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.H1 />
							<RichTextEditor.H2 />
							<RichTextEditor.H3 />
							<RichTextEditor.H4 />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Blockquote />
							<RichTextEditor.Hr />
							<RichTextEditor.BulletList />
							<RichTextEditor.OrderedList />
							<RichTextEditor.Subscript />
							<RichTextEditor.Superscript />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Link />
							<RichTextEditor.Unlink />
						</RichTextEditor.ControlsGroup>

						<RichTextEditor.ControlsGroup>
							<RichTextEditor.AlignLeft />
							<RichTextEditor.AlignCenter />
							<RichTextEditor.AlignJustify />
							<RichTextEditor.AlignRight />
						</RichTextEditor.ControlsGroup>
					</RichTextEditor.Toolbar>

					<RichTextEditor.Content />
				</RichTextEditor>
				<input
					type="text"
					placeholder="Tags..."
					value={tag}
					onChange={(e) => setTag(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							setTags(() => [...tags, tag]);
							setTag('');
						}
					}}
				/>
				<Flex gap={10}>
					{tags.map((tag) => (
						<Badge
							variant="filled"
							color={
								['cyan', 'teal', 'yellow', 'orange', 'grape', 'red', 'pink'][
									Math.floor(Math.random() * 7)
								]
							}
							key={tag}
							rightSection={<button onClick={() => filterTags(tag)}>x</button>}
						>
							{tag}
						</Badge>
					))}
				</Flex>
				<div>
					<button onClick={createNote}>Create Note</button>
				</div>
			</Box>
		</Flex>
	);
};

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { useState, useEffect } from "react";
import { QueryControls } from "../components/QueryControls";
import { fetchPostList } from "../modules/queryFunctions";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const [postType, setPostType] = useState(attributes.postType);
	const [postsPerPage, setPostsPerPage] = useState(attributes.postsPerPage);
	const [postTypeChanged, setPostTypeChanged] = useState(false);
	const [postList, setPostList] = useState(
		attributes.postsList === "" ? [] : JSON.parse(attributes.postsList),
	);
	const [mediaList, setMediaList] = useState(JSON.parse(attributes.mediaList));
	const [paginationChanged, setPaginationChanged] = useState(false);

	useEffect(() => {
		if (postList[0] === undefined) {
			fetchPostList(
				postType,
				postsPerPage,
				setPostList,
				setMediaList,
				setAttributes,
			);
		}

		if (postTypeChanged === true || paginationChanged) {
			fetchPostList(
				postType,
				postsPerPage,
				setPostList,
				setMediaList,
				setAttributes,
			);
			setPostTypeChanged(false);
			setPaginationChanged(false);

			console.log(postList);
		}
	}, [postList, postType, postTypeChanged, mediaList, paginationChanged]);

	return (
		<div {...useBlockProps()}>
			<QueryControls
				att={{ attributes: attributes, setAttributes: setAttributes }}
				type={{
					postType: postType,
					setPostType: setPostType,
					postTypeChanged: postTypeChanged,
					setPostTypeChanged: setPostTypeChanged,
				}}
				pagination={{
					postsPerPage: postsPerPage,
					setPostsPerPage: setPostsPerPage,
					paginationChanged: paginationChanged,
					setPaginationChanged: setPaginationChanged,
				}}
			/>

			<div class="query-cpt--list">
				<ul>
					{postList.map((post, index) => {
						return (
							<li
								class="query-list--item"
								style={{
									backgroundImage: `url(${mediaList[index]})`,
									backgroundSize: "cover",
									backgroundColor: "lightgrey",
								}}
							>
								<div class="query-list--item--footer">
									<a href={post.link}>
										<h3>{post.title.rendered}</h3>
										<p>
											<strong>Lorem Ipsum et dolor</strong>
										</p>
									</a>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

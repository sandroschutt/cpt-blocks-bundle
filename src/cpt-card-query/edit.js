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
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import { QueryControls } from "../components/QueryControls";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import { useState, useEffect } from "react";
import { Spinner } from "@wordpress/components";
import { fetchPostList } from "../modules/queryFunctions";

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
			fetchPostList(postType, postsPerPage, setPostList, setMediaList, setAttributes)
		}

		if (postTypeChanged === true || paginationChanged) {
			fetchPostList(postType, postsPerPage, setPostList, setMediaList, setAttributes)
			setPostTypeChanged(false);
			setPaginationChanged(false);
		}
	}, [postList, postType, postTypeChanged, mediaList, paginationChanged]);

	function isCardLoaded(excerpt, cardBgImage) {
		if (cardBgImage === undefined) {
			return (
				<div className="loader">
					<Spinner
						style={{
							height: "75px",
							width: "75px",
						}}
					/>
				</div>
			);
		} else {
			return (
				<>
					<div className="card-content">{excerpt.substring(3, 156)}</div>
				</>
			);
		}
	}

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
			<div className="query-doctors">
				{
				postList.map((post, index) => {
					return (
						<div
							className="doctor-card"
							style={{
								backgroundImage: `url(${mediaList[index]})`,
								backgroundSize: "cover",
								backgroundColor: "lightgrey",
							}}
						>
							{isCardLoaded(post.excerpt.rendered, mediaList[index])}
							<div className="card-footer">
								<a href={post.link}>
									<h5>{post.title.rendered}</h5>
								</a>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

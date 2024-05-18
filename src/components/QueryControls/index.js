import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useState, useEffect } from "react";
import axios from "axios";
import {
	Panel,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";

export function QueryControls(props) {
	const attributes = props.att.attributes;
	const setAttributes = props.att.setAttributes;
	const [postTypeList, setPostTypeList] = useState([
		{ label: "Posts", value: "" },
	]);
	const [postType, setPostType] = useState(attributes.postType);
	const setParentPostType = props.type.setPostType;
	const setPostTypeChanged = props.type.setPostTypeChanged;
	const [postsPerPage, setPostsPerPage] = useState(attributes.postsPerPage);
	const setParentPostsPerPage = props.pagination.setPostsPerPage;
	const setPaginationChanged = props.pagination.setPaginationChanged;

	useEffect(() => {
		async function fetchPostTypesList() {
			axios
				.get(`${window.location.origin}/wp-json/wp/v2/cpt-post-types`)
				.then((response) => {
					setPostTypeList(response.data)
				})
				.catch((error) => console.log(error))
		}

		if (postTypeList[1] === undefined) {
			fetchPostTypesList();
		}
	}, [postTypeList]);

	return (
		<InspectorControls>
			<Panel header={__("Options", "cpt-card-query")}>
				<PanelBody
					title={__("Post Type Settings", "cpt-card-query")}
					initialOpen={true}
				>
					<PanelRow>
						<SelectControl
							label={__("Post type", "cpt-card-query")}
							value={postType}
							options={postTypeList}
							onChange={(value) => {
								setPostType(value);
								setParentPostType(value);
								setAttributes({postType: value});
								setPostTypeChanged(true);
							}}
						/>
					</PanelRow>
					<PanelRow>
						<div>
							<label
								htmlFor=""
								className="components-text components-input-control__label"
								style={{ fontSize: ".85em", fontWeight: "500" }}
							>
								{__("Query items".toUpperCase(), "cpt-card-query")}
							</label>
							<input
								type="number"
								value={postsPerPage}
								onChange={(event) => {
									setPostsPerPage(event.target.value);
									setAttributes({ postsPerPage: event.target.value });
									setParentPostsPerPage(event.target.value)
									setPaginationChanged(true);
								}}
								className="components-text-control__input"
								style={{ marginTop: "8px" }}
								min="1"
							/>
						</div>
					</PanelRow>
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
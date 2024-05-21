import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useState, useEffect } from "react";
import {
	Panel,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";
import { fetchPostTypesList } from "../../modules/fetchPostTypeList";

export function QueryControlsRealetFields(props) {
	const attributes = props.att.attributes;
	const setAttributes = props.att.setAttributes;
	const [postTypeList, setPostTypeList] = useState([
		{ label: "Posts", value: "" },
	]);
	const [postType, setPostType] = useState(attributes.postType);
	const setParentPostType = props.type.setPostType;
	const setPostTypeChanged = props.type.setPostTypeChanged;

	useEffect(() => {
		if (postTypeList[1] === undefined) {
			fetchPostTypesList(setPostTypeList);
		}
	}, [postTypeList]);

	return (
		<InspectorControls>
			<Panel header={__("Options", "cpt-card-query")}>
				<PanelBody
					title={__("Related Post Type", "cpt-card-query")}
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
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
}
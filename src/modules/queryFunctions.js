import axios from "axios";

export async function fetchPostList(postType, postsPerPage, setPostList, setMediaList, setAttributes) {
	postType === "post" ? (postType = "posts") : (postType = postType);
	await axios
		.get(
			`${window.location.origin}/wp-json/wp/v2/${postType}?_fields=id,title,excerpt,link,featured_media&page=1&per_page=${postsPerPage}`,
		)
		.then((response) => {
			setPostList(response.data);
			setAttributes({postsList: JSON.stringify(response.data)});
            fetchImageList(response.data, setMediaList, setAttributes);
		})
		.catch((error) => console.error("Error fetching posts:", error));
}

async function fetchImageList(postList, setMediaList, setAttributes) {
	let currentImageList = [];
	setMediaList(currentImageList);
	postList.map((post) => {
		axios
			.get(
				`${window.location.origin}/wp-json/wp/v2/media/${post.featured_media}`,
			)
			.then((response) => {
				currentImageList.push(response.data.source_url);
				setMediaList(currentImageList);
				setAttributes({ mediaList: JSON.stringify(currentImageList) });
			})
			.catch((error) => {
				console.error("Error fetching media:", error.message);
			});
	});
}

export async function fetchGlobalPostList(postType, setPostList, setMediaList, setAttributes) {
	postType === "post" ? (postType = "posts") : (postType = postType);
	await axios
		.get(
			`${window.location.origin}/wp-json/wp/v2/${postType}?_fields=id,title,link,featured_media&page=1&per_page=5`,
		)
		.then((response) => {
			setPostList(response.data);
			setAttributes({postsList: JSON.stringify(response.data)});
            fetchImageList(response.data, setMediaList, setAttributes);
		})
		.catch((error) => console.error("Error fetching posts:", error));
}

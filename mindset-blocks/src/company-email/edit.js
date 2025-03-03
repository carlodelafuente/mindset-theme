/**
* Retrieves the translation of text.
*
* @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
*/
import { __ } from '@wordpress/i18n';

/**
* Provides utilities to interact with block props and render block content.
* - useBlockProps: Handles block wrapper attributes like className and styles.
* - RichText: A component for rich text editing within blocks.
* - InspectorControls: Allows adding custom controls to the block editor sidebar.
* 
* @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
*/
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';

/**
* Enables interaction with WordPress entities (e.g., posts, users) using the core data store.
* - useEntityProp: Allows easy access to WordPress custom fields.
* 
* @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/#useentityprop
*/
import { useEntityProp } from '@wordpress/core-data';

/**
* Provides pre-built UI components for creating block settings in the editor.
* - PanelBody: Groups settings into collapsible panels.
* - PanelRow: Lays out content or controls in rows within a panel.
* - ToggleControl: A toggle switch control for boolean settings.
* 
* @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/
* @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
*/
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';

/**
* The edit function describes the structure of your block in the context of the
* editor. This represents what the editor will render when the block is used.
*
* @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
*
* @return {Element} Element to render.
*/
export default function Edit({ attributes, setAttributes }) {

	// Set the post ID of your Contact Page
	const postID = 17;

	// Fetch meta data as an object and the setMeta function
	const [meta, setMeta] = useEntityProp('postType', 'page', 'meta', postID);

	// Destructure all our meta data for ease of use
	const { company_email } = meta;

	// Flexible helper for setting a single meta value w/o mutating state
	const updateMeta = (key, value) => {
		setMeta({ ...meta, [key]: value });
	};

	const { svgIcon } = attributes;

	return (
		<>
			<email {...useBlockProps()}>
				{svgIcon &&
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" role="img" aria-label="Email Icon"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
				}
				<RichText
					placeholder={__('Enter email here...', 'mindset-blocks')}
					tagName="p"
					value={company_email}
					onChange={(nextValue) => updateMeta("company_email", nextValue)}
				/>
			</email>
			<InspectorControls>
				<PanelBody title={__('Settings', 'mindset-blocks')}>
					<PanelRow>
						<ToggleControl
							label={__('Show SVG Icon', 'mindset-blocks')}
							checked={svgIcon}
							onChange={(value) =>
								setAttributes({ svgIcon: value })
							}
							help={__('Display an SVG icon next to the email.', 'mindset-blocks')}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
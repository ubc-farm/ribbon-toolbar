# ribbon-toolbar
![Example screenshot](screenshot.png)

## CSS properties
* `--dark-background`: Used as the colored background for the ribbon.
  Defaults to `var(--brand-primary)`.
* `--light-background`: Used as the light background of the sections and the
  selected tab. Defaults to `#f1f1f1`
* `--header-size`: Sets the size of the header. Since Tab Groups overlay their labels
  on top of the ribbon, this variable sets the height of the tab group label.
  Defaults to `2.44em`.

## Ribbon.default
Should wrap the ribbon components used.

`props.defaultSelected` is used to specify a default selected tab, rather than starting with
no selected tab. If this is specified, the ribbon will act like an always open ribbon rather
than a minimized ribbon.
All other props will be set on the underlying `form` element.

## Ribbon.TabList
Contains the tabs for the ribbon
to select. Children should be either Tabs or ContextualTabs.

> Ribbon.default automatically passes props 'onClick', 'selected', and 'menuOpen'.
> If the TabList is wrapped in another React component, make sure that these props
> are passed to TabList.

## Ribbon.Tab
Represents a tab for the user to click.
* `props.children`: any React node
* `props.id`: Required. ID to represent the Tab, must be unique within the ribbon.

> Ribbon.default automatically passes props 'onClick' and 'selected'.
> If the Tab is wrapped in another React component, make sure that these props
> are passed to Tab.

## Ribbon.ContextualTabs
Groups tabs so that they can be hidden when not needed.
Children should be Tab elements.
* `props.title`: React node. Displayed above the tabs as a label
* `props.hidden`: Boolean. If true, the tab group is hidden and disabled.

> Ribbon.default automatically passes props 'onClick' and 'selected'.
> If ContextualTabs is wrapped in another React component, make sure that these props
> are passed to ContextualTabs.

## Ribbon.Panel
Tab panel that displays whenever the corresponding tab is selected.
* `props.id`: Required. Must be the same as one of the tabs.

> Ribbon.default automatically passes prop 'selected'.
> If the Panel is wrapped in another React component, make sure that these props
> are passed to Panel.

## Ribbon.ApplicationMenu
A special Panel that can open seperately from the other tabs.
Displays as an absolute-positioned element, but it can modified with CSS.

> Ribbon.default automatically passes prop 'menuOpen'.
> If the ApplicationMenu is wrapped in another React component, make sure that these props
> are passed to ApplicationMenu.

## Ribbon.MenuTab
A special Tab that corresponds to the ApplicationMenu.

> Ribbon.default automatically passes props 'menuOpen' and 'onClick'.
> If the MenuTab is wrapped in another React component, make sure that these props
> are passed to MenuTab.

## Ribbon.MenuGroup
Helper for use inside Panels. Good for grouping form elements.
*TODO*: Make fieldset instead of div?
* `props.title`: Label for the group, displayed underneath its elements. Can only be a string.
* `props.children`: Contexts of the group.

## Ribbon.Barrier
Wraps some other ReactElement so that props created by Ribbon
('selected', 'menuOpen', and 'onClick') are not passed to the wrapped element.
Useful for having native elements as direct children of the Ribbon.

# Azure Front Door Migration Guide

This document outlines the breaking changes in the Azure Front Door Python SDK and provides guidance on how to migrate your code accordingly.

## Breaking Changes

### 1. Removal of Multi-Level Flattened Properties
In previous versions, certain properties were flattened into multiple levels for ease of access. This has been changed to a more structured model. 
- **Previous Example:**
    ```python
    front_door = FrontDoor(...)
    domain_name = front_door.customDomains[0].name
    ```
- **Updated Example:**
    ```python
    front_door = FrontDoor(...)
    domain_name = front_door.custom_domains[0].name
    ```
Be sure to check your property access points and update them accordingly.

### 2. Removals of Pageable Models
The SDK have removed support for pageable models. Users must now handle pagination manually when fetching lists of resources.
- **Previous Example:**
    ```python
    pages = front_door.list_custom_domains() # returns a pageable object
    for page in pages:
        for domain in page:
            print(domain.name)
    ```
- **Updated Example:**
    ```python
    domains = front_door.list_custom_domains()  # returns a list directly
    for domain in domains:
        print(domain.name)
    ```
Make sure your code directly accesses lists rather than relying on pagination features.

### 3. Introduction of Keyword-Only Parameters
Recent updates have introduced keyword-only parameters for various functions. This change enhances clarity and reduces the chances of errors due to incorrect argument ordering.
- **Previous Example:**
    ```python
    front_door.create_custom_domain(name='mydomain', resource_group='myresourcegroup')
    ```
- **Updated Example:**
    ```python
    front_door.create_custom_domain(resource_group='myresourcegroup', name='mydomain')
    ```
When calling functions, ensure to use keyword arguments to avoid issues with parameter misordering.

## Conclusion
Carefully review the breaking changes listed above and adjust your code accordingly to ensure a smooth migration to the latest Azure Front Door Python SDK version.
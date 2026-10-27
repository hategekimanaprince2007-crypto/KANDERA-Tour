
/* =========================================
   KABENDERA TOUR LTD.
   TOUR PACKAGES JAVASCRIPT
   File: tour-packages.js
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Get page elements
    const searchInput = document.getElementById("package-search");
    const categorySelect = document.getElementById("package-category");
    const packageCards = document.querySelectorAll(".package-card");
    const emptyMessage = document.getElementById("package-empty");

    const detailsPanel = document.getElementById("package-panel");
    const closeButton = document.getElementById("package-close");

    const detailTitle = document.getElementById("package-detail-title");
    const detailDescription = document.getElementById(
        "package-detail-description"
    );
    const activitiesList = document.getElementById("package-activities");
    const detailPrice = document.getElementById("package-detail-price");
    const bookingLink = document.getElementById("package-booking");

    // Tour package information
    const packages = {
        gorilla: {
            title: "Gorilla Trekking Adventure",
            description:
                "Discover Rwanda's mountain gorillas on a guided " +
                "trekking adventure in Volcanoes National Park. " +
                "Enjoy the beautiful forest scenery and learn about " +
                "gorilla conservation.",
            price: "Illustrative price: From $1,200",
            activities: [
                "Guided gorilla trekking experience",
                "Explore the Volcanoes National Park area",
                "Learn about wildlife conservation",
                "Enjoy Rwanda's mountain scenery"
            ]
        },

        safari: {
            title: "Wildlife Safari",
            description:
                "Explore Akagera National Park and experience " +
                "Rwanda's wildlife and savannah landscapes. " +
                "Activities depend on the itinerary and park conditions.",
            price: "Illustrative price: From $450",
            activities: [
                "Guided game drive",
                "Wildlife observation",
                "Photography opportunities",
                "Explore the park's landscapes"
            ]
        },

        kivu: {
            title: "Lake Kivu Escape",
            description:
                "Enjoy a relaxing trip to Lake Kivu, known for its " +
                "scenic shores, surrounding hills, and peaceful atmosphere. " +
                "Optional activities may be arranged separately.",
            price: "Illustrative price: From $250",
            activities: [
                "Enjoy views of Lake Kivu",
                "Explore lakeside areas",
                "Relax and take photographs",
                "Optional boat activity, subject to availability"
            ]
        },

        culture: {
            title: "Rwanda Cultural Tour",
            description:
                "Discover Rwanda's culture, history, and everyday life " +
                "through a guided visit to selected attractions in Kigali. " +
                "The final itinerary can be tailored to your interests.",
            price: "Illustrative price: From $100",
            activities: [
                "Visit selected Kigali attractions",
                "Learn about Rwandan history",
                "Discover local culture and traditions",
                "Enjoy a guided city experience"
            ]
        }
    };

    // Search and filter packages
    function filterPackages() {
        const searchTerm = searchInput.value
            .trim()
            .toLowerCase();

        const selectedCategory = categorySelect.value;

        let visibleCount = 0;

        packageCards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();
            const cardCategory = card.dataset.category;

            const matchesSearch = cardText.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;

            const shouldShow = matchesSearch && matchesCategory;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        // Show a message if nothing matches
        emptyMessage.hidden = visibleCount !== 0;

        // Hide details if their package is filtered out
        if (!detailsPanel.hidden) {
            const selectedTitle = detailTitle.textContent;

            const selectedCard = Array.from(packageCards).find(
                function (card) {
                    const button = card.querySelector(".package-details");
                    const packageData = packages[button.dataset.package];

                    return packageData &&
                        packageData.title === selectedTitle;
                }
            );

            if (selectedCard && selectedCard.hidden) {
                detailsPanel.hidden = true;
            }
        }
    }

    // Listen for search and category changes
    searchInput.addEventListener("input", filterPackages);

    categorySelect.addEventListener("change", filterPackages);

    // Display package details
    document.querySelectorAll(".package-details").forEach(
        function (button) {

            button.addEventListener("click", function () {
                const packageId = button.dataset.package;
                const selectedPackage = packages[packageId];

                if (!selectedPackage) {
                    return;
                }

                detailTitle.textContent = selectedPackage.title;

                detailDescription.textContent =
                    selectedPackage.description;

                detailPrice.textContent = selectedPackage.price;

                // Remove previous activities
                activitiesList.replaceChildren();

                // Add the selected package's activities
                selectedPackage.activities.forEach(function (activity) {
                    const listItem = document.createElement("li");

                    listItem.textContent = activity;

                    activitiesList.appendChild(listItem);
                });

                // Connect to the booking section on the main website
                bookingLink.href = "index.html#booking";

                // Display and scroll to the details
                detailsPanel.hidden = false;

                detailsPanel.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        }
    );

    // Close the package details panel
    closeButton.addEventListener("click", function () {
        detailsPanel.hidden = true;
    });

    // Set the initial filter state
    filterPackages();

});

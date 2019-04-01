/* JAVASCRIPT CODE GOES HERE */

Plotly.d3.csv("https://raw.githubusercontent.com/phamoh/HIV_AB_CoEvo/phamoh-patch-1/dataset_031519.csv",
    function(err, rows) {

        function unpack(rows, key) {
            return rows.map(function(row) {
                return row[key];
            });
        }

        var allPatientIDs = unpack(rows, 'patient_id'),
            allTimePoints = unpack(rows, 'time_point'),
            allABDPi = unpack(rows, 'ab_diversity_pi'),
            allHIV_div = unpack(rows, 'hiv_diversity_pi'),
            listofPatients = [],
            currentPatient,
            currentABDPi = [],
            currentHIVPi = [],
            currentTimePoint = [];

        //This affects the dropdown menu
        for (var i = 0; i < allPatientIDs.length; i++) {
            if (listofPatients.indexOf(allPatientIDs[i]) === -1) {
                listofPatients.push(allPatientIDs[i]);
            }
        }
        listofPatients.push("All Patients")

        console.log(allPatientIDs);
        console.log(listofPatients[0]);
        console.log(listofPatients[10]);



        var trace1 = [];

        function getPatientData(chosenPatient) {
            currentHIVPi = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allHIV_div,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentHIVPi.push(allHIV_div[i]);
                    currentTimePoint.push(allTimePoints[i]);

                    trace1 = {
                        x: currentTimePoint,
                        y: currentHIVPi,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {
                            color: 'rgb(142, 124, 195)',
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }

        };


        setBubblePlot("1");

        function setBubblePlot(chosenPatient) {
            getPatientData(chosenPatient);

            var data = [trace1];

            var layout = {
                title: 'HIV Diversity of Patient ' + chosenPatient,
                titlefont: {
                    family: 'Poppins, sans-serif',
                },
                xaxis: {
                    title: 'Estimated Time Since Infection (years)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                },
                yaxis: {
                    title: 'Diversity (pi)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };

            Plotly.newPlot('plotdiv1', data, layout, { showSendToCloud: true, responsive: true });
        };


        // This code populates the info to the plots and the dropdowns.
        var innerContainer = document.querySelector('[data-num1="0"]'),
            //plotEl = innerContainer.querySelector('.plot'),
            patientSelector = innerContainer.querySelector('.patientdata1');

        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length; i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        };

        assignOptions(listofPatients, patientSelector);

        function updatePatient() {
            setBubblePlot(patientSelector.value);
        }

        patientSelector.addEventListener('change', updatePatient, false);

    });
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
            allHIVDpi = unpack(rows, 'hiv_diversity_pi'),
            allHIVDivergenceNonsyn = unpack(rows, 'hiv_non_synonymous_divergence'),
            allHIVDivergenceSyn = unpack(rows, 'hiv_synonymous_divergence'),
            allABDivergence = unpack(rows, 'ab_divergence'),
            allABCDR = unpack(rows, 'abr_baseline_mean_sigma_CDR'),
            allABFWR = unpack(rows, 'abr_baseline_mean_sigma_FWR'),
            allHIVSelection = unpack(rows, 'hiv_selection_dN_dS'),
            currentPatient,
            listofPatients = [],
            listofPatientsALL = [],
            currentData = [],
            currentTimePoint = [];

        //This affects the dropdown menu
        for (var i = 0; i < allPatientIDs.length; i++) {
            if (listofPatients.indexOf(allPatientIDs[i]) === -1) {
                listofPatients.push(allPatientIDs[i]);
            }
        }

        for (var i = 0; i < allPatientIDs.length; i++) {
            if (listofPatientsALL.indexOf(allPatientIDs[i]) === -1) {
                listofPatientsALL.push(allPatientIDs[i]);
            }
        }
        listofPatientsALL.push("All Patients");

        function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length; i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
            }
        };

        // This code populates the info to the plots and the dropdowns.
        var innerContainer1 = document.querySelector('[data-num1="0"]'),
            patientSelector1 = innerContainer1.querySelector('.patientdata1'),
            innerContainer2 = document.querySelector('[data-num2="0"]'),
            patientSelector2 = innerContainer2.querySelector('.patientdata2'),
            innerContainer3 = document.querySelector('[data-num3="0"]'),
            patientSelector3 = innerContainer3.querySelector('.patientdata3');


        assignOptions(listofPatientsALL, patientSelector1);
        assignOptions(listofPatientsALL, patientSelector2);
        assignOptions(listofPatients, patientSelector3);

        var trace1 = [];
        var trace2 = [];

        function getPatientDataHIV(chosenPatient) {
            currentHIVDpi = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allHIVDpi,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentHIVDpi.push(allHIVDpi[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentHIVDpi,
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

        function getPatientDataAbR(chosenPatient) {
            currentABDPi = [];
            currentTimePoint = [];
            trace1 = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (chosenPatient === 'All Patients') {
                    trace1 = {
                        type: 'scatter',
                        mode: 'lines+markers',
                        x: allTimePoints,
                        y: allABDPi,
                        connectgaps: true,
                        text: allPatientIDs,
                        transforms: [{
                            type: 'groupby',
                            groups: allPatientIDs,
                        }]
                    }
                } else if (allPatientIDs[i] === chosenPatient) {
                    currentABDPi.push(allABDPi[i]);
                    currentTimePoint.push(allTimePoints[i]);
                    trace1 = {
                        x: currentTimePoint,
                        y: currentABDPi,
                        mode: 'lines+markers',
                        type: 'scatter',
                        connectgaps: true,
                        line: {
                            color: 'rgb(255,127,80)',
                        },
                        marker: {
                            size: 12,
                            opacity: 0.5
                        },
                    }
                }
            }
        };

        function getPatientDataBOTH(chosenPatient) {
            currentHIVDPi = [];
            currentTimePoint = [];
            currentABDPi = [];
            currentTimePoint = [];
            for (var i = 0; i < allPatientIDs.length; i++) {
                if (allPatientIDs[i] === chosenPatient) {
                    currentHIVDPi.push(allHIVDpi[i]);
                    currentABDPi.push(allABDPi[i]);
                    currentTimePoint.push(allTimePoints[i]);
                }
            }
        }

        setBubblePlotHIV("1");
        setBubblePlotAbR("1");
        setBubblePlotBOTH("1");

        function setBubblePlotHIV(chosenPatient) {
            getPatientDataHIV(chosenPatient);
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
                    title: 'Diversity (π)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv1', data, layout, { showSendToCloud: true, responsive: true });
        };

        function setBubblePlotAbR(chosenPatient) {
            getPatientDataAbR(chosenPatient);
            var data = [trace1];
            var layout = {
                title: 'AbR Diversity of Patient ' + chosenPatient,
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
                    title: 'Diversity (π)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }
            };
            Plotly.newPlot('plotdiv2', data, layout, { showSendToCloud: true, responsive: true });
        };

        function setBubblePlotBOTH(chosenPatient) {
            getPatientDataBOTH(chosenPatient);
            var trace1 = {
                x: currentTimePoint,
                y: currentHIVDPi,
                name: 'HIV',
                mode: 'lines+markers',
                type: 'scatter',
                connectgaps: true,
                line: {
                    color: 'rgb(142, 124, 195)',
                },
                marker: {
                    size: 12,
                    opacity: 0.5,
                },

            };
            var trace2 = {
                x: currentTimePoint,
                y: currentABDPi,
                name: 'AbR',
                mode: 'lines+markers',
                type: 'scatter',
                connectgaps: true,
                line: {
                    color: 'rgb(255,127,80)',
                },
                marker: {
                    size: 12,
                    opacity: 0.5,
                },

            };
            //This function is for the layout of the plot
            var data = [trace1, trace2];
            var layout = {
                title: 'HIV + AbR Diversity of Patient ' + chosenPatient,
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
                    title: 'Diversity (π)',
                    titlefont: {
                        family: 'Poppins, sans-serif',
                    },
                }


            };

            Plotly.newPlot('plotdiv3', data, layout, { showSendToCloud: true, responsive: true });
        };


        function updatePatientHIV() {
            setBubblePlotHIV(patientSelector1.value);
        }

        function updatePatientAbR() {
            setBubblePlotAbR(patientSelector2.value);
        }

        function updatePatientBOTH() {
            setBubblePlotBOTH(patientSelector3.value);
        }

        patientSelector1.addEventListener('change', updatePatientHIV, false);
        patientSelector2.addEventListener('change', updatePatientAbR, false);
        patientSelector3.addEventListener('change', updatePatientBOTH, false);


    });